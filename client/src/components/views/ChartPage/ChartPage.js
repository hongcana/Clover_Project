import React, { useEffect, useRef } from 'react';
import { DrawChart } from './DrawChart';
import { Box } from '@mui/system';
import { Autocomplete, Grid, Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.js';
import CloverLogo from '../../../styles/Img/Clover_logo.png';

import './ChartPage.css'

function ChartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const Code = location.state.code
  const Name = location.state.name
  const Ex_path = location.state.ex_path

  const logoClick = event => {
    navigate('/')
  }
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
              {Name}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                typography: {
                  fontSize: 20,
                  fontWeight: 450,
                  color: '#00000ff'
                }
              }}>
              {Code}
            </Paper>
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
              <DrawChart data={Ex_path} />
            </Paper>
          </Grid>
          <Grid item
            xs={4}>
            <Paper sx={{ padding: 3, width: 1, height: '50vh' }}>
              신뢰도 써야하는데 내일까지 꼭 할게용ㅎㅎ
            </Paper>
          </Grid>
        </Grid>
      </Box >
    </Box >
  )
}

export default ChartPage