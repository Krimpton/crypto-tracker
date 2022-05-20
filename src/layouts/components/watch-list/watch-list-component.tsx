import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './watch-list-component.scss';
import { WatchListContext } from '../../../context/watchListContext';

const WatchListComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [watchCoins, setWatchCoins] = useState<any>([]);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`;
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const navigate = useNavigate();
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
    console.error(isLoading);
  }, [apiUrl, watchList]);

  return (
    <>
      {watchCoins.map((item: any) => (
        <div key={item.id} className="item-block d-flex justify-content-start align-items-center">
          <span
            role="presentation"
            className="material-icons-outlined item-clear"
            onClick={() => deleteCoin(item.id)}
          >
            clear
          </span>
          <span
            role="presentation"
            className="item-name"
            onClick={() => navigate(`/coin/${item.name.toLowerCase()}`)}
          >
            {item.name}
          </span>
          <span className="item-price-change">{item.price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      ))}
    </>
  );
};

export default WatchListComponent;
