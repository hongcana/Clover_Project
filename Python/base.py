import file_rw as rw
import prediction as pred

import FinanceDataReader as fdr
from datetime import datetime, timedelta

start_date = datetime.now().date() - timedelta(days=7)
end_date = datetime.now().date()
stock_info = rw.JsonRead('info.json') # EC2의 경우, 추후 절대경로 수정 필요
stock_code = stock_info['stock_code'] # 이거를 json으로 받아와야..

def MakeJsonOHLC(f_name, stock_code):
    start_date = datetime.now().date() - timedelta(days=3650)
    end_date = datetime.now().date()

    data = fdr.DataReader(stock_code, start_date, end_date)
    data["time"] = data.index
    data["time"] = data["time"].dt.strftime("%Y-%m-%d")
    data = data.reset_index()
    
    data.drop(columns=["Volume", "Change","Date"], inplace=True)
    data=data[['time','Open','High','Low','Close']]

    # json 생성 양식은 to_json의 파라미터 조정으로 변경 가능
    json_data = data.to_json(orient='index')
    rw.JsonWrite(f_name, json_data)

MakeJsonOHLC("Price.json", stock_code)

# df_now = fdr.DataReader(stock_code, start=start_date, end=end_date)
# signal, sharpe = pred.CalculateSignal()

# if sharpe == None:
#     sharpe = "알 수 없음"

# elif sharpe <= -2:
#     sharpe = "매우 낮음"
    
# elif sharpe <= 0:
#     sharpe = "낮음"

# elif (0 < sharpe) and (sharpe <= 1):
#     sharpe = "보통"

# elif sharpe > 1:
#     sharpe = "높음"

# elif sharpe >= 2:
#     sharpe = "매우 높음"

# json_data = {'stock_code' : stock_code,\
#     'date' : df_now.iloc[-1].name.date(),\
#     'open' : df_now.Open.iloc[-1],\
#     'high' : df_now.High.iloc[-1],\
#     'low' : df_now.Low.iloc[-1],\
#     'close' : df_now.Close.iloc[-1],\
#     'signal' : signal,\
#     '신뢰도' : sharpe
# }

# file_name = 'result.json'
# rw.JsonWrite(file_name, json_data)