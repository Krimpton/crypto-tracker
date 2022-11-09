import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency } from '../../models/ICurrency';
import { fetchCurrency } from './action-creators';

export interface ICurrencyState {
  currency: ICurrency[];
  isLoading: boolean;
  error: string;
}

const initialState: ICurrencyState = {
  currency: [],
  isLoading: false,
  error: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    filterByMarketCap(state) {
      state.currency.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.market_cap < b.market_cap ? -1 : a.market_cap > b.market_cap ? 1 : 0
      );
    },
    filterByTopTraded(state) {
      state.currency.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.current_price > b.current_price ? -1 : a.current_price > b.current_price ? 0 : 1
      );
    },
    filterByTopGainer(state) {
      state.currency.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.market_cap_change_percentage_24h < b.market_cap_change_percentage_24h
          ? 1
          : a.market_cap_change_percentage_24h > b.market_cap_change_percentage_24h
          ? -1
          : 0
      );
    },
    filterByTopLoser(state) {
      state.currency.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.market_cap_change_percentage_24h < b.market_cap_change_percentage_24h
          ? -1
          : a.market_cap_change_percentage_24h > b.market_cap_change_percentage_24h
          ? 1
          : 0
      );
    },
  },

  extraReducers: {
    [fetchCurrency.fulfilled.type]: (state, action: PayloadAction<ICurrency[]>) => {
      state.isLoading = false;
      state.error = '';
      state.currency = action.payload;
    },
    [fetchCurrency.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCurrency.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const { filterByMarketCap, filterByTopTraded, filterByTopGainer, filterByTopLoser } =
  currencySlice.actions;
