import React, { useState } from 'react';
import './LandingPage.css';
import StockItem from '../Data/Stocks.json';
import { List } from './List';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import SearchBar from '../SearchBar/SearchBar.js';

function LandingPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const onSearch = (data) => {
    console.log("success");
    navigate("/chart")
    //ChartPage 로 이동, 결과없을 때 예외 처리 
  }
  console.log(StockItem)
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
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems="center"
      minHeight="70vh"
    >
      <Grid item
        margin='10vh'
        className='logo'>
        <Paper> Clover Logo</Paper>
      </Grid>
      <Grid item className='SearchBar'>
        <SearchBar />
      </Grid>
    </Box >
  )
}

export default LandingPage