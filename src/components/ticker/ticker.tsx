import { useEffect, useState } from 'react';
import './ticker.scss';
import { fetchCurrencyTrendingCoin } from '../../store/reducers/action-creators';
import { useAppDispatch } from '../../hooks/typed-hooks';

const Ticker = () => {
  // const apiUrl = 'https://api.coingecko.com/api/v3/search/trending';
  // const [currency, setCurrency] = useState<any[] | any>();

  // TODO fix api data for ticker

  const dispatch = useAppDispatch();

  const [tickerListData] = useState([
    'bitcoin',
    'dogecoin',
    'ripple',
    'xrp',
    'ethereum',
    'wrapped',
  ]);

  // const { coinList } = useAppSelector((state) => state.trendingListReducer);

  const tickerData = tickerListData.map((item) => (
    <div className="ticker-element">{item.toUpperCase()}</div>
  ));
  console.log(tickerData);

  useEffect(() => {
    dispatch(fetchCurrencyTrendingCoin());
  }, [dispatch]);
  // console.log(coinList.coins);
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {tickerData}
        {tickerData}
      </div>
    </div>
  );
};

export default Ticker;

// useEffect(() => {
//   const fetchTrendingCurrency = async () => {
//     const { data } = await axios.get(apiUrl);
//     setCurrency(data);
//     console.log(data);
//     dispatch(fetchCurrencyTrendingCoin);
//   };
//   fetchTrendingCurrency();
// }, []);

// <div className="ticker-element">{item.toUpperCase()}</div>
