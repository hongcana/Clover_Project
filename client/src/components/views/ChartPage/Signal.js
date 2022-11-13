import React, { useEffect, useState } from 'react'
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, typography } from '@mui/system';

import SignalInfo from '../Data/signal.json';
//import axios from 'axios'


function Signal() {
    // const [Signalinfo, setSignalinfo] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await axios.get("http://15.165.181.15:8080/info/signal")
    //             setSignalinfo(res.data);
    //         }
    //         catch (e) {
    //             console.error(e.message)
    //         }
    //     }
    //     fetchData()
    // }, [])
    if (SignalInfo['signal'] === 0) {
        return (
            <Box>
                <Box sx={{
                    padding: 7,
                    color: '#03ac13',
                    typography: {
                        fontSize: 50,
                        fontWeight: 550
                    }
                }}>
                    <SentimentSatisfiedAltIcon
                        sx={{ fontSize: 100 }}
                    />
                    매도
                </Box>
                <Box sx={{
                    padding: 3,
                    typography: {
                        fontSize: 50,
                        fontWeight: 550,
                        color: '#1aa7ec'
                    }
                }}>
                    신뢰도 : {SignalInfo.reliability}
                </Box>
            </Box>
        )
    }
    return (
        <Box>
            <Box sx={{
                padding: 7,
                color: '#ff0000',
                typography: {
                    fontSize: 50,
                    fontWeight: 550,

                }
            }}>
                <SentimentNeutralIcon
                    sx={{ fontSize: 100 }}
                />
                매수
            </Box>
            <Box sx={{
                padding: 3,
                typography: {
                    fontSize: 50,
                    fontWeight: 550,
                    color: '#1aa7ec'
                }
            }}>
                신뢰도 : {SignalInfo.reliability}
            </Box>
        </Box>
    )

}

export default Signal