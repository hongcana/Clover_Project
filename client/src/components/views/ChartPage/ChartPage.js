import React, { useEffect, useState } from 'react';
import { Box, typography } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { DrawChart } from './DrawChart';
import Signal from './Signal.js';
import SearchBar from '../SearchBar/SearchBar.js';
import CloverLogo from '../../../styles/Img/Clover_logo.png';


function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state.code
  const name = location.state.name
  const isNotRefreshed = location.state.isNotRefreshed

  useEffect(() => {
    if (isNotRefreshed == 1) { navigate(0,{state: {isNotRefreshed : 0}}) }
    else return
  }, [isNotRefreshed])
  return (
    <Box>
      <Box sx={{ paddingTop: 5, paddingLeft: 10 }} className='TopBox'>
      </Box>
      <Grid container
        direction='row'
        sx={{ paddingTop: 5, paddingLeft: 10 }}
      >
        <Grid item xs={6}>
          <Link to='/'><img src={CloverLogo} /> </Link>
        </Grid>
        <Grid item xs={4}
          sx={{ paddingTop: 10 }}
        >
          <SearchBar />
        </Grid>
      </Grid>
      <Box sx={{ padding: 10, paddingTop: 0 }} className='Stock'>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={4}
          sx={{ margin: 0, padding: 2, width: 1 / 2 }} className='StockInfo'>
          <Grid item xs={8}>
            <Paper
              elevation={0}
              sx={{
                typography: {
                  fontWeight: 550,
                  fontSize: 30,
                  color: 'green',
                }
              }}
            >
              {name}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                typography: {
                  fontSize: 20,
                  fontWeight: 450,
                  color: '#00000ff'
                }
              }}>
              {code}
            </Box>
          </Grid>
        </Grid>
        <Grid container
          direction='row'
          spacing={0}>
          <Grid item
            xs={8}
            sx={{ m: 0 }}
          >
            <Paper sx={{ padding: 3, width: 0.9, margin: 0, height: '50vh' }}>
              <DrawChart />
            </Paper>
          </Grid>
          <Grid item
            xs={4}>
            <Box sx={{
              padding: 3, width: 1, height: '50vh'
            }}>
              <Signal />
            </Box>
          </Grid>
        </Grid>
      </Box >
    </Box >
  )
}

export default ChartPage