import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrencyHistory } from './action-creators';
import { ICurrencyHistory } from '../../models/ICurrencyHistory';

interface CurrencyHistoryState {
  pricesList: ICurrencyHistory[];
  isLoading: boolean;
  error: string;
}

const initialState: CurrencyHistoryState = {
  pricesList: [],
  isLoading: false,
  error: '',
};

export const currencyHistorySlice = createSlice({
  name: 'currency-history',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrencyHistory.fulfilled.type]: (state, action: PayloadAction<ICurrencyHistory[]>) => {
      state.isLoading = false;
      state.error = '';
      state.pricesList = action.payload;
    },
    [fetchCurrencyHistory.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCurrencyHistory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default currencyHistorySlice.reducer;
