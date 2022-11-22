import React, { useEffect, useState } from 'react'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { CircularProgress } from '@mui/material';
import { Box, typography } from '@mui/system';
import axios from 'axios'
import { Navigate } from 'react-router-dom';


function Signal() {
    const [SignalInfo, setSignalInfo] = useState({});
    const [Icon, setIcon] = useState(CircularProgress);
    const [boxColor, setBoxColor] = useState('#ffffff')
    const [message, setMessage] = useState('계산중...')

    const getData = async () => {
        try {
            const res = await axios.get("http://15.165.181.15:8080/info/signal")
            setSignalInfo(res.data);
        }
        catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getData().then(() => {
                if (SignalInfo.signal === 1) {
                    setBoxColor('#03ac13')
                    setMessage('매수')
                    setIcon(SentimentSatisfiedAltIcon)
                }
                else {
                    setBoxColor('#ff0000')
                    setMessage('매도')
                    setIcon(SentimentNeutralIcon)
                }
            })
        }, 14000)
    }, [SignalInfo])


    return (
        <Box>
            <Box sx={{
                padding: 7,
                color: `${boxColor}`,
                typography: {
                    fontSize: 50,
                    fontWeight: 550
                }
            }}>
                <Icon
                    sx={{ fontSize: 100 }}
                />
                {message}
            </Box>
            <Box sx={{
                padding: 3,
                typography: {
                    fontSize: 50,
                    fontWeight: 550,
                    color: '#1aa7ec'
                }
            }}>
                신뢰도 : {SignalInfo?.reliability || message}
                {console.log(SignalInfo)}
            </Box>
        </Box>
    )
}
export default Signal