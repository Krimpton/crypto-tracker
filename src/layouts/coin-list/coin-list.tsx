import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import './coin-list.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-hooks';
import { fetchCurrency } from '../../store/reducers/action-creators';
import CoinCard from '../layout/coin-card/coin-card';
import {
  filterByMarketCap,
  filterByTopGainer,
  filterByTopLoser,
  filterByTopTraded,
} from '../../store/reducers/currency-slice';
import BurgerButton from '../components/burger-button/burger-button';
import Ticker from '../../components/ticker/ticker';

const CoinList: FC = () => {
  const dispatch = useAppDispatch();
  const { currency, isLoading, error } = useAppSelector((state) => state.currencyReducer);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const [search, setSearch] = useState<string>('');
  const searchHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value),
    []
  );

  const [active, setActive] = useState<boolean>(false);
  // const data = useMemo(() => filteredCoins(currency), [currency]);
  console.log(active);
  const filteredCoins = currency.filter((coin) =>
    coin.id.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <BurgerButton />
      <Ticker />
      <div className="container-fluid search-wrapper">
        {/* <dropdown selected={selected} setSelected={setSelected} /> */}
        <span
          role="presentation"
          className={`button-border${active ? 'button-active-button' : ''}`}
          onClick={() => setActive(!active)}
        >
          <button
            type="submit"
            className="button-sort default"
            onClick={() => dispatch(filterByMarketCap())}
          >
            Market Cap
          </button>
        </span>
        <button
          type="submit"
          className="button-sort traded"
          onClick={() => dispatch(filterByTopTraded())}
        >
          Top Traded
        </button>
        <button
          type="submit"
          className="button-sort gainer"
          onClick={() => dispatch(filterByTopGainer())}
        >
          Top Gainer
        </button>
        <button
          type="submit"
          className="button-sort loser"
          onClick={() => dispatch(filterByTopLoser())}
        >
          Top Loser
        </button>
        <span className="input-wrapper d-flex justify-content-center align-items-center">
          <input
            onChange={searchHandler}
            value={search}
            placeholder="Search"
            className="search-input"
          />
        </span>
      </div>

      <div className="card-container d-flex justify-content-center flex-md-row flex-wrap">
        {isLoading && <div className="spinner-grow text-warning main-spinner" />}
        {error && <div>{error}</div>}
        {filteredCoins.map((coin) => (
          <div role="presentation" key={coin.id}>
            <CoinCard
              id={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              current_price={coin.current_price}
              high_24h={coin.high_24h}
              low_24h={coin.low_24h}
              market_cap_change_percentage_24h={coin.market_cap_change_percentage_24h}
              atl={coin.atl}
              ath={coin.ath}
              market_cap={coin.market_cap}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CoinList;
