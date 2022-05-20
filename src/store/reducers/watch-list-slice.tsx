import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDataState = {
  watchList: ['monero', 'helium'],
};

const watchListSlice = createSlice({
  name: 'watch-list',
  initialState: initialDataState,
  reducers: {
    addWatchListItem(state, action: PayloadAction<string[] | string | undefined | any>) {
      if (initialDataState.watchList.indexOf(action.payload) === -1)
        initialDataState.watchList.push(action.payload);
    },
    removeWatchListItem(state, action) {
      initialDataState.watchList.splice(action.payload, 1);
    },
  },
});

export default watchListSlice.reducer;
export const { addWatchListItem, removeWatchListItem } = watchListSlice.actions;
