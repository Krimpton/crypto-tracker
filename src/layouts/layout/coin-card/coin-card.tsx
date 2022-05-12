import React from 'react';
import "./coin.scss";
import {ICurrency} from "../../../models/ICurrency";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/typed-hooks";

const CoinCard: React.FC<ICurrency> = ({
                                       name,
                                       image,
                                       current_price,
                                       high_24h,
                                       low_24h,
                                       market_cap_change_percentage_24h = 0,
                                       ath,
                                       atl,
                                   }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const redirectCoinPage = () => navigate('/coin/:id');


    return (
        <>
            {market_cap_change_percentage_24h < 0 ?
                // (<div className="coin-block-minus" onClick={redirectCoinPage}>
                // (<div className="coin-block-minus" onClick={() => dispatch(filterSelectedCoin(prompt()))}>
                (<div className="coin-block-minus">
                    <div className="coin-name">{name}</div>
                    <img className="coin-img" src={image} alt="coin-image"/>
                    <div className="current-price">${current_price?.toFixed(2)}</div>
                    <div className="price-delay">
                        <div className="high-price d-flex">high: ${high_24h}</div>
                        <div className="low-price d-flex justify-content-center">low: ${low_24h}</div>
                    </div>
                    <div className="price-footer">
                        {market_cap_change_percentage_24h < 0 ? (
                                <div
                                    className="h24-price-minus d-flex justify-content-center">{market_cap_change_percentage_24h?.toFixed(2)}%</div>
                            ) :
                            (
                                <div
                                    className="h24-price d-flex justify-content-center">{market_cap_change_percentage_24h?.toFixed(2)}%</div>
                            )
                        }
                    </div>
                    <div className="ath-alt-block">
                        <div className="alt-price">atl: {atl?.toFixed(1)}</div>
                        <div className="ath-price">ath: {ath?.toFixed(1)}</div>
                    </div>
                </div>)
                :
                (
                    <div className="coin-block-rise" onClick={redirectCoinPage}>
                        <div className="coin-name">{name}</div>
                        <img className="coin-img" src={image} alt="coin-image"/>
                        <div className="current-price">${current_price?.toFixed(2)}</div>
                        <div className="price-delay">
                            <div className="high-price d-flex">high: ${high_24h}</div>
                            <div className="low-price d-flex justify-content-center">low: ${low_24h}</div>
                        </div>
                        <div className="price-footer">
                            {market_cap_change_percentage_24h < 0 ? (
                                    <div
                                        className="h24-price-minus d-flex justify-content-center">{market_cap_change_percentage_24h?.toFixed(2)}%</div>
                                ) :
                                (
                                    <div
                                        className="h24-price d-flex justify-content-center">+{market_cap_change_percentage_24h?.toFixed(2)}%</div>
                                )
                            }
                        </div>
                        <div className="ath-alt-block">
                            <div className="alt-price">atl: {atl?.toFixed(1)}</div>
                            <div className="ath-price">ath: {ath?.toFixed(1)}</div>
                        </div>
                    </div>)}
        </>
    );
};

export default CoinCard;
