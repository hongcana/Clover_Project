import React, { useEffect, useRef } from 'react';
import preConvertData from '../Data/Price.json';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Paper } from '@mui/material';

const styleInfo = {
    paddingLeft: '10px',
    paddingTop: '10px'
}

function DrawChart() {
    const chartContainerRef = useRef();
    const chart = useRef();

    function lowerCaseInnerKey(innerobj) {
        var tmp = {}
        Object.entries(innerobj).slice(0).reverse().map(([key, value]) => {
            if (value === 0) value = tmp['close']
            tmp[key.toLowerCase()] = value
            return 0;
        }
        )
        return tmp
    }

    if (typeof preConvertData === 'string') preConvertData = JSON.parse(preConvertData)
    var convertedData = Object.entries(preConvertData).map(([key, value]) =>
        Object.assign({}, { "time": key }, lowerCaseInnerKey(value))
    )


    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
            layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255,255,0.9)',
            },
            grid: {
                vertLines: {
                    color: '#334158'
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal
            },
            priceScale: {
                borderColor: "#485c7b"
            },
            timeScale: {
                borderColor: '#485c7b'
            }
        });

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#4bffb5",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#4bffb5",
            wickDownColor: "#838ca1",
            wickUpColor: "#838ca1"
        });

        console.log(convertedData)
        candleSeries.setData(convertedData)
    }, [convertedData]);

    return (
        <Paper ref={chartContainerRef}
            sx={{ padding: 0, width: 1, height: 1 }} />
    )
}

export { DrawChart }