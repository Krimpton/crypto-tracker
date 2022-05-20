import { createContext, FC, useEffect, useState } from 'react';

const initialDataState = {
  watchList: ['ethereum'],
};
export const WatchListContext = createContext<any | null>({
  initialDataState,
});

export const WatchListContextProvider: FC = ({ children }) => {
  const [watchList, setWatchList] = useState<any>(
    localStorage.getItem('watchList')?.split(',') || ['ethereum']
  );
  const [starValue, setStarValue] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('watchList', watchList);
  }, [watchList]);

  const addCoin = (coin: string) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
      setStarValue(!starValue);
      console.log(`${starValue}starValue`);
    }
  };

  const deleteCoin = (item: string) => {
    setWatchList(
      watchList.filter((el: any) => {
        return el !== item;
      })
    );
    setStarValue(!starValue);
    console.log(`${starValue}starValue`);
  };

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        starValue,
        addCoin,
        deleteCoin,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
