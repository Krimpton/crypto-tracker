import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../hooks/typed-hooks';

const WatchList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [watchCoins, setWatchCoins] = useState([]);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`;
  // const { watchList } = useContext(WatchListContext);
  const { watchList } = useAppSelector((state) => state.watchListReducer);
  const watchToLower = watchList.map((item: any) => {
    return item.toLowerCase();
  });
  console.log(watchToLower);
  console.log(isLoading);
  console.log(watchCoins);

  // console.log(isLoading, watchCoins, watchList);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await axios.get(apiUrl, {
        params: {
          ids: watchList.join(','),
        },
      });
      setWatchCoins(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {watchCoins.map((item: any) => (
        <div key={item}>
          <div>{item.id}</div>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
