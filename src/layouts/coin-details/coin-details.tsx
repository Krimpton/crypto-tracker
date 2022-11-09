import { useEffect, useState } from 'react';
import './coin-details.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../components/slider/image-slider';
import 'chart.js/auto';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-hooks';
import { fetchCurrencyHistory } from '../../store/reducers/action-creators';
import HistoryChart from '../components/history-chart/history-chart';

const CoinDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [coinData, setCoinData] = useState<any>();
  const { isLoading } = useAppSelector((state) => state.currencyHistoryReducer);

  const baseUrl = 'https://api.coingecko.com/api/v3';
  const apiUrl = `${baseUrl}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;

  useEffect(() => {
    const fetchCoinData = async () => {
      const { data } = await axios.get(apiUrl);
      setCoinData(data);
      dispatch(fetchCurrencyHistory());
    };
    fetchCoinData();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="spinner-grow text-warning main-spinner d-flex justify-content-center align-items-center" />
      )}
      {coinData && (
        <div className="wrapper-section">
          <div className="slider-block d-flex justify-content-center align-items-center">
            <ImageSlider />
          </div>

          <div className="currency-name">
            {coinData.name} <span className="currency-symbol">{coinData.symbol.toUpperCase()}</span>
          </div>

          <div className="currency-current-price d-flex">
            {coinData.market_data.current_price.usd}
            <div className="percentage">
              {coinData.market_data.market_cap_change_percentage_24h < 0 ? (
                <div className="h24-price-minus d-flex justify-content-center">
                  {coinData.market_data.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
              ) : (
                <div className="h24-price d-flex justify-content-center">
                  +{coinData.market_data.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
              )}

              {coinData.market_data.price_change_24h.toFixed(2) < 0 ? (
                <div className="price-changes-sum minus">
                  {coinData.market_data.price_change_24h < -1 ? (
                    <div>{coinData.market_data.price_change_24h.toFixed(2)}$</div>
                  ) : (
                    <div>{coinData.market_data.price_change_24h}$</div>
                  )}
                </div>
              ) : (
                <div className="price-changes-sum plus">
                  {coinData.market_data.price_change_24h > 6 ? (
                    <div>+{coinData.market_data.price_change_24h.toFixed(2)}$</div>
                  ) : (
                    <div>+{coinData.market_data.price_change_24h}$</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-end">
            <div className="price-changes d-flex flex-md-column">
              <div className="price-changes-24h">
                <span className="price-category">24h high:</span>
                {coinData.market_data.high_24h.usd}$
              </div>
              <div className="price-changes-24h">
                <span className="price-category-second">24h low:</span>
                {coinData.market_data.low_24h.usd}$
              </div>
            </div>
          </div>

          <div className="currency-supply">
            <div>TOTAL SUPPLY: {coinData.market_data.total_supply}</div>
            {coinData.market_data.max_supply ? (
              <div>MAX SUPPLY: {coinData.market_data.max_supply}</div>
            ) : (
              <div>MAX SUPPLY: none</div>
            )}
          </div>
          <div className="currency-ranks">
            <span className="currency-ranks-list">
              ALEXA RANK: {coinData.public_interest_stats.alexa_rank}
            </span>
            <span className="currency-ranks-list">
              LIQUIDITY SCORE: {coinData.liquidity_score.toFixed(2)}
            </span>
          </div>
          <HistoryChart />
        </div>
      )}
    </>
  );
};

export default CoinDetails;
