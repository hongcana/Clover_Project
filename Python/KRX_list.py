import pandas as pd

def GetStockList(market):
    '''
    KIND에서 상장된 기업 리스트를 불러오는 함수입니다.
    유가증권, 코스닥 시장의 기업을 불러올 수 있습니다.
    KIND 서버가 터지거나, url 혹은 request URL Header가 바뀌지 않는 이상
    동작합니다.

    market :
        kospi, KOSPI: 유가증권 시장의 기업을 불러옵니다.
        kosdaq, KOSDAQ: 코스닥 시장의 기업을 불러옵니다.
    '''
    market = market.lower()
    if market == 'kosdaq':
        url_market = 'kosdaqMkt'
    elif market == 'kospi':
        url_market = 'stockMkt'
    else:
        print('Invalid Market...Please try again... <KRXList.py>')
        return

    url = 'http://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13&marketType='+url_market
    df = pd.read_html(url, header =0)[0]

    return df

if __name__ == '__main__':
    result_kospi = GetStockList('KOSPI')
    result_kosdaq = GetStockList('kosdaq')
    result_kospi = result_kospi[['회사명','종목코드']]
    result_kosdaq = result_kosdaq[['회사명', '종목코드']]
    result_kospi['거래소코드'] = 'KS'
    result_kosdaq['거래소코드'] = 'KD'

    print(result_kospi)
    print(result_kosdaq)

    # 2개 합치기
    results = pd.concat([result_kospi, result_kosdaq], ignore_index=True)

    # DB의 종목코드가 6자리 미만이면 앞에 0을 추가해주는 코드, 필요시 수정(results를 다른 변수로)
    for idx,row in results.iterrows():
        if len(str(row['종목코드'])) < 6:
            plus = 6 - len(str(row['종목코드'])) # 자릿수
            newcode = '0'*plus + str(row['종목코드'])
            results.loc[idx,'종목코드'] = newcode
            #esults.iloc[idx]['종목코드'] = str(row['종목코드'])

    # issue : 이거 해도 to_csv로 저장되면 string으로 종목코드가 저장이 안됨.. 해결이 어려운듯한데

    # CSV로 파일 저장. 필요시 삭제
    import time
    timestr = time.strftime("%y%m%d_%H%M%S")
    print(results.dtypes)
    results.to_csv('stock_result.csv', mode='w', encoding='utf-8-sig')
    #results.to_csv('result_'+timestr+'.csv', encoding='utf-8-sig')

