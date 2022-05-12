import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import "./coin-list.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/typed-hooks";
import {fetchCurrency} from "../../store/reducers/ActionCreators";
import CoinCard from '../layout/coin/coinCard';
import {useNavigate} from 'react-router-dom';

export interface selectedProps {
    selected: boolean;
    setSelected: any;
}

const CoinList: React.FC = () => {

    const dispatch = useAppDispatch();
    const {currency, isLoading, error} = useAppSelector(state => state.currencyReducer)

    useEffect(() => {
        dispatch(fetchCurrency())
    }, [])

    const [search, setSearch] = useState<string>('');

    const searchHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value),
        [],
    );

    const filteredCoins = currency.filter(coin =>
        coin.id.toLowerCase().includes(search.toLowerCase())
    )

    const [selected, setSelected] = useState<any>("Sort by");

    const bb = [1, 4, 6, 11, 42];

    // const filterByTraded = () => {
    // currency.id.slice.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id)
    // console.log(bb)
    // }


    const initialStates = [
        {current_price: 11, market_cap: 11, market_cap_rank: 11, fully_diluted_valuation: 11},
        {current_price: 4, market_cap: 4, market_cap_rank: 4, fully_diluted_valuation: 4},
        {current_price: 3, market_cap: 3, market_cap_rank: 3, fully_diluted_valuation: 3},
    ];


    // const neArray: any[] = initialStates.concat().sort((n1, n2) => n1.current_price + n2.current_price)
    // console.log(neArray)

    // const numericArray: number[] = [2, 3, 4, 1, 5, 8, 11];
    //
    // const sortedArray: number[] = numericArray.sort((n1, n2) => n1 - n2);
    //
    // console.log(sortedArray)
    //
    // const coinHandler = (id: any) => {
    //
    //     dispatch(filterByTraded(id))
    // }

    const navigate = useNavigate();

    return (
        <>
            <div className="search-wrapper">
                {/*<dropdown selected={selected} setSelected={setSelected} />*/}
                <div className="button-group">
                    <button className="button-sort default">Market Cap</button>
                    <button className="button-sort traded">Top Traded</button>
                    <button className="button-sort gainer">Top Gainer</button>
                    <button className="button-sort loser">Top Loser</button>
                    <input onChange={searchHandler} value={search} placeholder="Search" className="search-input"/>
                </div>
            </div>
            {isLoading && <div className="spinner-border main-spinner">

            </div>}
            {error && <div>{error}</div>}
            {
                filteredCoins.map((coin, index) =>
                    <div key={index} onClick={() => navigate(`/coin/${coin.id}`)}>
                        <CoinCard id={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol}
                                  current_price={coin.current_price} high_24h={coin.high_24h} low_24h={coin.low_24h}
                                  market_cap_change_percentage_24h={coin.market_cap_change_percentage_24h} atl={coin.atl}
                                  ath={coin.ath}/>
                    </div>
                )
            }
        </>
    );
};

export default CoinList;