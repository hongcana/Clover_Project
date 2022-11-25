import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function SearchBar() {
    const [StockItem, setStockItem] = useState([]);
    const keys = ['code', 'name']
    const [query, setQuery] = useState('');
    const [obj, setObj] = useState(null);
    const filteroption = (options, { inputValue }) => {
        return options.filter((item) => keys.some((key) => item[key].startsWith(inputValue.toUpperCase())))
    }
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("http://15.165.181.15:8080/search/allItems")
                setStockItem(res.data)
            }
            catch (e) {
                console.error(e.message)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (obj != null) {
            async function pushData() {
                try {
                    const data = await axios.post("http://15.165.181.15:8080/search/eachItem", { "keyword": obj.code })
                }
                catch (e) {
                    console.error(e.message)
                }
            }
            pushData()
            if (window.location.pathname === '/chart') {
                navigate(0)
            }
            navigate("/chart", { state: { code: obj.code, name: obj.name } })
        }
    }, [obj])
    return (
        <Autocomplete
            id="search_bar"
            autoComplete
            includeInputInList
            popupIcon={""}
            value={obj}
            onInputChange={(event, inputValue) => setQuery(inputValue)}
            onChange={(event, newValue) => { setObj(newValue) }}
            options={StockItem}
            getOptionLabel={(option) => option.name + '  ' + option.code}
            filterOptions={filteroption}
            noOptionsText={'찾으려는 주식이 없습니다...'}
            sx={{ width: 1 }}
            renderInput={(params) => <TextField
                {...params}
                label="Search.." />}
        />
    )
}

export default SearchBar