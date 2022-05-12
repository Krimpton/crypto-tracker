import { createContext, FunctionComponent, useState } from 'react';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IWatchListState {
  watchList: string[] | string | undefined | any;
}

const initialState: IWatchListState = {
  watchList: ['bitcoin', 'ethereum', 'tether'],
};

export const WatchListContext = createContext<any | null>(null);

const watchListSlice = createSlice({
  name: 'watch-list',
  initialState,
  reducers: {
    addWatchListItem(state, action: PayloadAction<string[] | string | undefined | any>) {
      if (state.watchList.indexOf(action.payload) === -1) state.watchList.push(action.payload);
    },
    removeWatchListItem(state, action) {
      state.watchList.splice(action.payload, 1);
    },
  },
});

export const WatchListContextProvider: FunctionComponent = ({ ...props }) => {
  const [watchListContext, setWatchListContext] = useState<any>(['bitcoin', 'ethereum', 'tether']);
  const removeItem = (id: any) =>
    setWatchListContext((items: any) => items.filter((coin: { id: string }) => coin.id !== id));
  return (
    <WatchListContext.Provider value={{ watchListContext, setWatchListContext, removeItem }}>
  {props.children}
  </WatchListContext.Provider>
);
};

export default watchListSlice;

// export default watchListSlice.reducer;
// export const { addWatchListItem, removeWatchListItem } = watchListSlice.actions;
//
//
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// interface IWatchListState {
//   watchList: string[] | string | undefined | any;
// }
//
// const initialState: IWatchListState = {
//   watchList: ['bitcoin', 'ethereum', 'tether'],
// };
//
// export const watchListSlice = createSlice({
//   name: 'watch-list',
//   initialState,
//   reducers: {
//     addWatchListItem(state, action: PayloadAction<string[] | string | undefined | any>) {
//       if (state.watchList.indexOf(action.payload) === -1) state.watchList.push(action.payload);
//     },
//     removeWatchListItem(state, action) {
//       state.watchList.splice(action.payload, 1);
//     },
//   },
// });
//
// export default watchListSlice.reducer;
// export const { addWatchListItem, removeWatchListItem } = watchListSlice.actions;
