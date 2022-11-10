import file_rw as rw
import prediction as pred

import pandas as pd
import FinanceDataReader as fdr
from datetime import datetime, timedelta

stock_info = rw.JsonRead('info.json') # EC2의 경우, 추후 절대경로 수정 필요
stock_code = stock_info['stock_code'] # 종목코드는 json으로 받아와야.. 혹은 수정 가능

def MakeJsonOHLC(f_name, stock_code):
    start_date = datetime.now().date() - timedelta(days=3650)
    end_date = datetime.now().date()

    data = fdr.DataReader(stock_code, start_date, end_date)
    data["date"] = data.index
    data["date"] = data["date"].dt.strftime("%Y-%m-%d")
    data.drop(columns=["Volume", "Change"], inplace=True)
    data = data.set_index("date")

    # json 생성 양식은 to_json의 파라미터 조정으로 변경 가능
    json_data = data.to_json(orient="index")
    rw.JsonWrite(f_name, json_data)

def MakeSignal(f_name, stock_code):
    start_date = datetime.now().date() - timedelta(days=7)
    end_date = datetime.now().date()
    df_now = fdr.DataReader(stock_code, start=start_date, end=end_date)
    signal, sharpe = pred.CalculateSignal()

    if sharpe == None:
        sharpe = "알 수 없음"
    elif sharpe <= -2:
        sharpe = "매우 낮음"
    elif sharpe <= 0:
        sharpe = "낮음"
    elif (0 < sharpe) and (sharpe <= 1):
        sharpe = "보통"
    elif sharpe > 1:
        sharpe = "높음"
    elif sharpe >= 2:
        sharpe = "매우 높음"
    json_data = {'stock_code' : stock_code,\
        'date' : df_now.iloc[-1].name.date(),\
        'open' : df_now.Open.iloc[-1],\
        'high' : df_now.High.iloc[-1],\
        'low' : df_now.Low.iloc[-1],\
        'close' : df_now.Close.iloc[-1],\
        'signal' : signal,\
        '신뢰도' : sharpe
    }
    rw.JsonWrite(f_name, json_data)

# def Listing():
#     kospi = fdr.StockListing('KOSPI')
#     kosdaq = fdr.StockListing('KOSDAQ')
#     result1 = pd.concat([kospi,kosdaq], ignore_index=True)
#     result1 = result1.drop(['ISU_CD', 'Market', 'Dept', 'Close', 'ChangeCode',
#        'Changes', 'ChagesRatio', 'Open', 'High', 'Low', 'Volume', 'Amount',
#        'Marcap', 'Stocks', 'MarketId'], axis=1)
#     listing = result1.to_json(force_ascii=False, orient = 'index')
#     rw.JsonWrite('listing.json', listing)
# Listing()

MakeJsonOHLC('price.json', stock_code)
MakeSignal('signal.json', stock_code)