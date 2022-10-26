import pandas as pd
import numpy as np
import FinanceDataReader as fdr
import file_rw as rw
import os
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, f1_score
import time

start_date = datetime.now().date() - timedelta(days=3650)
end_date = datetime.now().date()
stock_info = rw.JsonRead('info.json') # EC2의 경우, 추후 절대경로 수정 필요
stock_code = stock_info['stock_code'] # 이거를 json으로 받아와야..

def LoadFinanceData():
    print('read stock data...')
    data = fdr.DataReader(stock_code, start_date, end_date)

    # 상장 1년 미만 주식 pass
    if len(data) < 252:
        new_stock = 1
        data = 0
        kospi = 0
        nasdaq = 0
        vix = 0
        return data, kospi, nasdaq, vix, new_stock
    else:
        new_stock = 0

    print('read kospi data...')
    if os.path.isfile("kospi.csv") == False:
        print("kospi.csv is not found... loading new data...")
        kospi = fdr.DataReader('KS11', start_date, end_date)
        kospi.to_csv('kospi.csv')
    else:
        kospi = pd.read_csv('kospi.csv')
        kospi = kospi.set_index('Date')
        kospi.index = pd.to_datetime(kospi.index)
        if kospi.iloc[-1].name.date() != datetime.now().date():
            print("New date found, update new data...")
            kospi = fdr.DataReader('KS11', start_date, end_date)
            kospi.to_csv('kospi.csv')

    print('read NASDAQ data...')
    if os.path.isfile("nasdaq.csv") == False:
        print("nasdaq.csv is not found... loading new data...")
        nasdaq = fdr.DataReader('IXIC', start_date, end_date)
        nasdaq.to_csv('nasdaq.csv')
    else:
        nasdaq = pd.read_csv('nasdaq.csv')
        nasdaq = nasdaq.set_index('Date')
        nasdaq.index = pd.to_datetime(nasdaq.index)
        if nasdaq.iloc[-1].name.date() != datetime.now().date() - timedelta(days=1):
            print("New date found, update new data...")
            nasdaq = fdr.DataReader('IXIC', start_date, end_date)
            nasdaq.to_csv('nasdaq.csv')

    print('read VIX data...')
    if os.path.isfile("vix.csv") == False:
        print("vix.csv is not found... loading new data...")
        vix = fdr.DataReader('VIX', start_date, end_date)
        vix.to_csv('vix.csv')
    else:
        vix = pd.read_csv('vix.csv')
        vix = vix.set_index('Date')
        vix.index = pd.to_datetime(vix.index)
        if vix.iloc[-1].name.date() != datetime.now().date() - timedelta(days=1):
            print("New date found, update new data...")
            vix = fdr.DataReader('VIX', start_date, end_date)
            vix.to_csv('vix.csv')

    return data, kospi, nasdaq, vix, new_stock

def FeatureBuliding(data, kospi, nasdaq, vix):
    data['Open-Close'] = data.Open - data.Close
    data['High-Low'] = data.High - data.Low
    data['kospi'] = pd.Series(kospi['Close'])
    data['nasdaq'] = pd.Series(nasdaq['Close'].shift(1))
    data['kospi'].fillna(method="ffill", inplace=True)
    data['nasdaq'].fillna(method="ffill", inplace=True)
    data['kospi_change'] = np.log(data['kospi']) - np.log(data['kospi'].shift(1))
    data['nasdaq_change'] = np.log(data['nasdaq']) - np.log(data['nasdaq'].shift(1))

    data['TP'] = (data['High'] + data['Low'] + data['Close']) / 3
    data['SMA'] = data['Close'].rolling(window = 20).mean()
    data['MAD'] = data['Close'].rolling(window = 20).apply(lambda x: pd.Series(x).mad())
    data['CCI'] = (data['TP'] - data['SMA']) / (0.015 * data['MAD'])
    data['VIX'] = pd.Series(vix['Close'].shift(1))
    data = data.replace([np.inf, -np.inf], np.nan)
    data = data.dropna()
    y = np.where(data.Close.shift(-1) > data.Close, 1, 0)
    data['Target'] = y
    data_2 = data.drop(['Open', 'High', 'Low', 'Close', 'Volume','Change',\
          'kospi', 'nasdaq','TP', 'SMA', 'MAD', 'Target'], axis=1)

    scaler = StandardScaler()
    scaler.fit(data_2)
    arr = scaler.transform(data_2)
    data_scaled = pd.DataFrame(arr, columns = data_2.columns)
    data_scaled.index = data.index
    
    return data, data_scaled, y

def DataSplit(data, y):
    # Time Series Data는 Shuffle 금지
    split_percentage = 0.7
    split = int(split_percentage * len(data))
    X_train, X_test, y_train, y_test = train_test_split(data, y, test_size= 1 - split_percentage, shuffle = False)
    return X_train, X_test, y_train, y_test, split

def modeling(data, X, X_train, X_test, y_train, y_test, split):
    train_acc = []
    test_acc =[]
    model_score = []
    sharpe_list = []
    high_score = 0 # 감마값 결정 변수
    high_gamma = 0
    high_f1 = 0
    r = [0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10, 30]

    print("Processing...")
    for i in r:
        cls = SVC(kernel="rbf", gamma = i)
        cls.fit(X_train, y_train)
        prediction = cls.predict(X_test)
        train_acc.append(cls.score(X_train, y_train))
        test_acc.append((prediction == y_test).mean())
        model_score.append(f1_score(y_test, cls.predict(X_test)))

        data['Signal'] = cls.predict(X)

        data['Log_Returns'] = np.log(data['Close'] / data['Close'].shift(1))
        Circumstance_Returns = data[split:]['Log_Returns'].cumsum() * 100

        data['Str_Returns'] = np.log(data['Close'] / data['Close'].shift(1)) * data['Signal'].shift(1)
        Circumstance_Returns_Str = data[split:]['Str_Returns'].cumsum() * 100

        std = Circumstance_Returns_Str.std()
        sharpe = (Circumstance_Returns_Str - Circumstance_Returns) / std
        sharpe = sharpe.mean()
        
        f1_save = f1_score(y_test, cls.predict(X_test))
        #DEBUG
        print("gamma detected... sharpe = {:.2f}, gamma = {}, f1 = {:.3f}".format(sharpe, i, f1_save))

        if len(sharpe_list) == 0:
            if np.isnan(sharpe) == True:
                pass
            elif sharpe < 3.01:
                # #DEBUG
                # print("first gamma detected... sharpe = {0}, gamma = {1}".format(sharpe, i))

                high_score = sharpe
                high_gamma = i
                high_f1 = f1_save
                sharpe_list.append(sharpe)
            else:
                pass

        else:
            if np.isnan(sharpe) == True:
                continue
            if cls.score(X_train, y_train) > 0.67:
                continue
            if (high_f1 * 0.95 < f1_save) and (high_score < sharpe):
                
                # DEBUG
                print("NEW high score = {:.2f}, sharpe = {:.2f}, gamma = {:.2f}".format(high_score, sharpe, i))

                high_score = sharpe
                high_gamma = i
                high_f1 = f1_score(y_test, cls.predict(X_test))
                sharpe_list.append(sharpe)
            
    ### DEBUG
    # print('훈련 정확도 : ', train_acc)
    # print('테스트 정확도 : ', test_acc)
    # print(sharpe_list)
    # print(model_score)
    # print(high_score)
    # print("high gamma : ", high_gamma)
    ###

    if high_gamma == 0:
        return -1, -1

    cls = SVC(kernel = 'rbf', gamma = high_gamma)
    cls.fit(X_train, y_train)

    accuracy_train = accuracy_score(y_train, cls.predict(X_train))
    accuracy_test = accuracy_score(y_test, cls.predict(X_test))
    f1_s = f1_score(y_test, cls.predict(X_test))

    print('훈련 정확도 : {:.4f}%'.format(accuracy_train * 100))
    print('테스트 정확도 : {:.4f}%'.format(accuracy_test * 100))
    print('F1 SCORE : {:.4f}'.format(f1_s))

    data['Signal'] = cls.predict(X)
    data['Log_Returns'] = np.log(data['Close'] / data['Close'].shift(1))
    Circumstance_Returns = data[split:]['Log_Returns'].cumsum() * 100
    data['Str_Returns'] = np.log(data['Close'] / data['Close'].shift(1)) * data['Signal'].shift(1)
    Circumstance_Returns_Str = data[split:]['Str_Returns'].cumsum() * 100
    print('누적 수익률 : {:.2f}%'.format(Circumstance_Returns_Str[-1]))

    std = Circumstance_Returns_Str.std()
    sharpe = (Circumstance_Returns_Str - Circumstance_Returns) / std
    sharpe = sharpe.mean()
    print("샤프 지수 : {:.2f} ".format(sharpe))
    print('현재 시그널 : ',data['Signal'][-1])

    return data['Signal'][-1], sharpe

def CalculateSignal():
    data, kospi, nasdaq, vix, new_stock = LoadFinanceData()
    if new_stock == 1:
        signal = "신규 상장"
        sharpe = None
        return signal, sharpe
    else:
        data, data_f, y = FeatureBuliding(data, kospi, nasdaq, vix)
        X_train, X_test, y_train, y_test, split = DataSplit(data_f, y)
        signal, sharpe = modeling(data, data_f, X_train, X_test, y_train, y_test, split)
        return signal, sharpe

#CalculateSignal()