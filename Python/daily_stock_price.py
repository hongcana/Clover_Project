import pandas as pd
import numpy as np
import requests
import re
import xmltodict
import json
from multiprocessing import Pool

# 주가 크롤링 메소드
def ReadStockPrice(StockCode, Count):
    '''
    네이버 금융에서 주가를 긁어오는 메소드입니다.
    DataFrame 형태로 과거 주가를 반환합니다.

    StockCode:
        StockCode(str) : 검색할 종목의 코드
        Count(int) : 일봉 기준 불러올 총 기간(영업일 기준, 1년 = 252일)
    '''
    url = f'https://fchart.stock.naver.com/sise.nhn?symbol={StockCode}&timeframe=day&count={Count}&requestType=0'
    rs = requests.get(url) # url로 부터 데이터를 받아옴

    # 데이터 무결성 체킹
    data_check = re.findall('<item data=\"(.*?)\" />', rs.text, re.DOTALL)
    if len(data_check) == 0: # data 없을경우
        print('반환된 데이터가 없습니다..<ReadStockPrice>')
        return pd.DataFrame()
    
    # XML to JSON
    dt = xmltodict.parse(rs.text) # 변환된 xml 형태의 데이터를 dict 형태로 읽음
    js = json.dumps(dt, indent=4) # 가공의 편의를 위해 json 형태로 변환
    js = json.loads(js) # json 형태의 데이터를 load함
    # js 데이터를 뜯어보고 싶으면 print(js)

    # DataFrame 반환
    data = pd.json_normalize(js['protocol']['chartdata']['item'])
    df = data['@data'].str.split('|',expand=True)
    df.columns = ['Date','Open','High','Low','Close','Volume']
    df.insert(0, 'Name', js['protocol']['chartdata']['@name']) # 주가 데이터 DataFrame에 종목이름 추가
    return df


# 모든 데이터 가격 수집 메소드
def ReadCodeList(df):
    tmp = []
    for i, row in df.iterrows():
        print('가격 데이터 수집중... {}/{}'.format(i, df.shape[0]), end='')
        tmp.append(ReadStockPrice(str(row['종목코드']), '2520'))
        print(' ... 완료!')
    PriceData = pd.concat(tmp, ignore_index=True)
    return PriceData 

if __name__ == '__main__':
    #symbol = input('종목코드입력...')
    #df = ReadStockPrice(102280, '2520') # 예시 : 삼성전자 1년
    #print(df)

    df = pd.read_csv('stock_result.csv', dtype={'종목코드' : object})
     
     # ------ 멀티프로세싱 ------
     # multiprocessing.cpu_count()로 최대 활용가능 CPU 확인하기
    num_cores = 4
    df_split = np.array_split(df, num_cores)
    pool = Pool(num_cores)
    results = pd.concat(pool.map(ReadCodeList, df_split))
    pool.close()
    pool.join()
    # ------------


    print(results.shape)
    results.to_csv('price_list.csv', mode='w', encoding='utf-8-sig')

