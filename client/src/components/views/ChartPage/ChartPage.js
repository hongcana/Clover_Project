import React, { useEffect, useRef } from 'react';
import { DrawChart } from './DrawChart';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';

import './ChartPage.css'

function ChartPage() {
  return (
    <Box sx={{ padding: 10 }}>
      <Paper sx={{ padding: 3, width: 1 / 2, height: 400 }}>
        <DrawChart className='chart_container' />
      </Paper>
    </Box>
  )
}

export default ChartPage