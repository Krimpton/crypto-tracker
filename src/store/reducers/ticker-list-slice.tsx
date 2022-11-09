import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITrending } from '../../models/ITrending';
import { fetchCurrencyTrendingCoin } from './action-creators';

interface ITrendingState {
  coinList: ITrending[];
  isLoading: boolean;
  error: string;
}

const initialState: ITrendingState = {
  coinList: [],
  isLoading: false,
  error: '',
};

export const trendingListSlice = createSlice({
  name: 'trending-list',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrencyTrendingCoin.fulfilled.type]: (state, action: PayloadAction<ITrending[]>) => {
      state.isLoading = false;
      state.error = '';
      state.coinList = action.payload;
    },
    [fetchCurrencyTrendingCoin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCurrencyTrendingCoin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default trendingListSlice.reducer;
