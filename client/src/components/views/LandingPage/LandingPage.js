import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import SearchBar from '../SearchBar/SearchBar.js';
import CloverLogo from '../../../styles/Img/Clover_logo.png';

import './LandingPage.css';

function LandingPage() {
  return (
    // <div>
    //   <div className='search'>
    //     <input type='text' placeholder=' Search...' className='search-box'
    //       onChange={e => setQuery(e.target.value)}
    //     />
    //     <button className='search-button'
    //       onClick={e => onSearch(query)}>Search</button>
    //   </div>
    //   <div className='dropbox'>
    //     <List data={search(StockItem)} />
    //   </div>
    // </div>
    <Grid
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems="center"
      minHeight="70vh"
    >
      <Box
        margin='10vh'
        className='logo'>
        <img src={CloverLogo} />
      </Box>
      <Box
        sx={{ width: 1 / 2 }}
        className='SearchBar'>
        <SearchBar />
      </Box>
    </Grid >
  )
}

export default LandingPage