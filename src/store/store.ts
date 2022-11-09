import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currency-slice';
import currencyHistoryReducer from './reducers/currency-history-slice';
import watchListReducer from './reducers/watch-list-slice';
import trendingListReducer from './reducers/ticker-list-slice';

const rootReducer = combineReducers({
  currencyReducer,
  currencyHistoryReducer,
  watchListReducer,
  trendingListReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: [thunk, logger]
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
