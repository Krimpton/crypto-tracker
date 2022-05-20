import './coin-card.scss';
import { FC, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICurrency } from '../../../models/ICurrency';
import { WatchListContext } from '../../../context/watchListContext';

const CoinCard: FC<ICurrency> = ({
  id,
  name,
  image,
  current_price,
  high_24h,
  low_24h,
  market_cap_change_percentage_24h = 0,
  ath,
  atl,
}) => {
  const navigate = useNavigate();
  const { watchList, addCoin, deleteCoin } = useContext(WatchListContext);
  const [fav, setFav] = useState<boolean>(false);

  const redirectCoinPage = () => {
    navigate(`/coin/${id}`);
  };

  const AddComponent = (e: any) => {
    e.stopPropagation();
    addCoin(id);
    setFav(true);
    console.log(fav);
  };

  const DeleteComponent = (e: any) => {
    e.stopPropagation();
    deleteCoin(id);
    setFav(!fav);
    console.log(fav);
  };

  const condition = market_cap_change_percentage_24h < 0 ? 'coin-block-minus' : 'coin-block-rise';
  const favoriteFun = fav ? DeleteComponent : AddComponent;
  const marketChange = market_cap_change_percentage_24h < 0 ? 'h24-price-minus' : 'h24-price';

  const ratingIconType = useMemo(() => {
    const isExist = !!watchList.find((coin: any) => coin === id);
    return isExist ? 'star' : 'star_outline';
  }, [id, watchList]);
  return (
    <>
      <div role="presentation">
        <div role="presentation" className={condition} onClick={redirectCoinPage}>
          <div className="coin-header">
            <div className="coin-name d-flex align-items-center">{name}</div>
            <div>
              <span
                role="presentation"
                className="material-icons-outlined coin-star"
                onClick={(e) => favoriteFun(e)}
              >
                {ratingIconType}
              </span>
            </div>
          </div>
          <img className="coin-img" src={image} alt="coin" />
          <div className="current-price">${current_price?.toFixed(2)}</div>
          <div className="price-delay">
            <div className="high-price d-flex">high: ${high_24h}</div>
            <div className="low-price d-flex justify-content-center">low: ${low_24h}</div>
          </div>

          <div className="price-footer">
            <div className={`${marketChange} d-flex justify-content-center`}>
              {market_cap_change_percentage_24h?.toFixed(2)}%
            </div>
          </div>
          <div className="ath-alt-block">
            <div className="alt-price">atl: {atl?.toFixed(1)}</div>
            <div className="ath-price">ath: {ath?.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinCard;
