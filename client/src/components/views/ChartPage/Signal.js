import React from 'react'
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, typography } from '@mui/system';

import Signalinfo from '../Data/signal.json'
import { fontSize } from '@mui/system';
import { red } from '@mui/material/colors';

function Signal() {
    if (Signalinfo['signal'] === 0) {
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
                    신뢰도 : {Signalinfo.reliability}
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
                신뢰도 : {Signalinfo.reliability}
            </Box>
        </Box>
    )

}

export default Signal