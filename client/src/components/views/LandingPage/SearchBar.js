import React from 'react'
import StockItem from '../Data/Stocks.json';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'


function SearchBar() {
    const keys = ['name', 'code'];
    const filterOption = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.name,
    });

    return (
        <Autocomplete
            id="search_bar"
            options={StockItem}
            getOptionLabel={(option) => option.name + '  ' + option.code}
            filterOptions={filterOption}
            sx={{ minWidth: 300 }}
            renderInput={(params) => <TextField {...params} label="Stocks" />}
        />
    )
}

export default SearchBar  