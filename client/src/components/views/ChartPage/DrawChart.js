import React, { useState, useEffect, useRef } from 'react';
//import preConvertData from '../Data/price.json';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function DrawChart() {
    const [stockData, setStockData] = useState([]);
    const [convertedData, setConvertedData] = useState(null);
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    const getData = async () => {
        try {
            await axios.get("http://15.165.181.15:8080/info/data")
                .then((res) => makeChart(convertData(res.data)));
        }
        catch (e) {
            console.error(e.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    function lowerCaseInnerKey(innerobj) {
        var tmp = {}
        Object.entries(innerobj).slice(0).reverse().map(([key, value]) => {
            if (value === 0) value = tmp['close']
            tmp[key.toLowerCase()] = value
        }
        )
        return tmp
    }
    function convertData(preConvertData) {
        if (typeof preConvertData === 'string') preConvertData = JSON.parse(preConvertData)
        var convertedData = Object.entries(preConvertData).map(([key, value]) =>
            Object.assign({}, { "time": key }, lowerCaseInnerKey(value))
        )
        return convertedData
    }
    function makeChart(data) {
        chart.current = createChart(chartContainerRef.current, {
            layout: {
                backgroundColor: '#283237',
                textColor: '#cae797', //#f7cd7a  cae797
            },
            grid: {
                vertLines: {
                    color: '#334158'
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal, // Magnet으로 할 시 끌려옴
            },
            priceScale: {
                borderColor: "#485c7b"
            },
            timeScale: {
                borderColor: '#485c7b'
            }
        });

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#ec6a5e", // rgba 형식으로 쓰면 느림... 왜느린지는 모름
            downColor: "#4a9df8",
            borderDownColor: "#4a9df8",
            borderUpColor: "#ec6a5e",
            wickDownColor: "#4a9df8",
            wickUpColor: "#ec6a5e"
        });
        candleSeries.setData(data)
        //      if (Object.entries(data)[0][1] === '/')
    }
    // useEffect(() => {
    //     if (stockData.length === 0) return;
    //     console.log(stockData)
    //     const candleSeries = chart.current.addCandlestickSeries({
    //         upColor: "#ec6a5e", // rgba 형식으로 쓰면 느림... 왜느린지는 모름
    //         downColor: "#4a9df8",
    //         borderDownColor: "#4a9df8",
    //         borderUpColor: "#ec6a5e",
    //         wickDownColor: "#4a9df8",
    //         wickUpColor: "#ec6a5e"
    //     });
    //     //      if (Object.entries(data)[0][1] === '/')
    //     candleSeries.update(stockData)
    // }, [])

    // useEffect(() => { // 차트 그림
    //     //        if (Object.entries(data)[0][1] === '/') {
    //     chart.current = createChart(chartContainerRef.current, {
    //         layout: {
    //             backgroundColor: '#283237',
    //             textColor: '#cae797', //#f7cd7a  cae797
    //         },
    //         grid: {
    //             vertLines: {
    //                 color: '#334158'
    //             }
    //         },
    //         crosshair: {
    //             mode: CrosshairMode.Normal, // Magnet으로 할 시 끌려옴
    //         },
    //         priceScale: {
    //             borderColor: "#485c7b"
    //         },
    //         timeScale: {
    //             borderColor: '#485c7b'
    //         }
    //     });
    //     //        }

    //     const candleSeries = chart.current.addCandlestickSeries({
    //         upColor: "#ec6a5e", // rgba 형식으로 쓰면 느림... 왜느린지는 모름
    //         downColor: "#4a9df8",
    //         borderDownColor: "#4a9df8",
    //         borderUpColor: "#ec6a5e",
    //         wickDownColor: "#4a9df8",
    //         wickUpColor: "#ec6a5e"
    //     });
    //     //      if (Object.entries(data)[0][1] === '/')
    //     candleSeries.setData(convertedData)
    //     //       else candleSeries.update(convertedData) // 혹시 차트 두번그려질까봐 추가했습니다
    // }, []);


    useEffect(() => { //차트 사이즈 조정
        resizeObserver.current = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            chart.current.applyOptions({ width, height });
            setTimeout(() => {
                chart.current.timeScale().fitContent();
            }, 0)
        });
        resizeObserver.current.observe(chartContainerRef.current);
        return () => resizeObserver.current.disconnect();
    }, []);

    // if (stockData.length === 0) {
    //     return (<div>
    //         loading..
    //     </div>)
    // }
    return (
        <Paper ref={chartContainerRef}
            sx={{ padding: 0, width: 1, height: 1 }} />
    )
}

export { DrawChart }