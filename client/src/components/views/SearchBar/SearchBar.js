import React, { useState } from 'react'
import StockItem from '../Data/Stocks.json';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import { useNavigate } from 'react-router-dom'


function SearchBar() {
    const keys = ['code', 'name']
    const [query, setQuery] = useState('');
    const filteroption = (options, { inputValue }) => {
        return options.filter((item) => keys.some((key) => item[key].startsWith(inputValue)))
    }
    const navigate = useNavigate()

    return (
        <Autocomplete
            id="search_bar"
            autoComplete
            includeInputInList
            // onChange={(event, selectedValue) => setQuery(selectedValue)}
            inputValue={query}
            onInputChange={(event, inputValue) => setQuery(inputValue)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    navigate("/chart")
                }
            }}
            options={StockItem}
            getOptionLabel={(option) => option.name + '  ' + option.code}
            filterOptions={filteroption}
            noOptionsText={'찾으려는 주식이 없습니다...'}
            sx={{ minWidth: 400 }}
            renderInput={(params) => <TextField
                {...params}
                label="Search" />}
        />
    )
}

export default SearchBar  