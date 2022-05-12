import axios from "axios";
import {ICurrency} from "../../models/ICurrency";
import {createAsyncThunk} from "@reduxjs/toolkit";

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const fetchCurrency = createAsyncThunk(
    'currency/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ICurrency[]>(apiUrl)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Data has not been loaded")
        }
    }
)

export const fetchCurrencyHistory = createAsyncThunk(
    'currency/history/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
            return response.data

        } catch (e) {
            return thunkAPI.rejectWithValue("Data has not been loaded")
        }
    }
)