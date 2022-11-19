import React, { useEffect, useState } from 'react'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, typography } from '@mui/system';

import SignalInfo from '../Data/signal.json';
import axios from 'axios'


function Signal(code) {
    const [Signalinfo, setSignalinfo] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                // var c = Object.values(code)
                // console.log(typeof c[0])
                console.log(code)
                const res = await axios.get("http://15.165.181.15:8080/info/signal", {
                    params: {
                        code
                    }
                }
                )
                setSignalinfo(res.data);
            }
            catch (e) {
                console.error(e.message)
            }
        }
        fetchData()
    }, [])
    if (SignalInfo['signal'] === 1) { //Signalinfo 로 바꿀것.
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

export default Signal