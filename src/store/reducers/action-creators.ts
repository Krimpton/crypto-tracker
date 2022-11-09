import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICurrency } from '../../models/ICurrency';
import { ICurrencyHistory } from '../../models/ICurrencyHistory';
import { ITrending } from '../../models/ITrending';

const apiCurrency =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const apiHistory =
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';

const apiTrending = 'https://api.coingecko.com/api/v3/search/trending';

const errorMessage = 'Data has not been loaded';

export const fetchCurrency = createAsyncThunk('currency/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<ICurrency>(apiCurrency);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const fetchCurrencyHistory = createAsyncThunk(
  'currency/history/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ICurrencyHistory>(apiHistory);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchCurrencyTrendingCoin = createAsyncThunk(
  'currency/trending',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ITrending>(apiTrending);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
