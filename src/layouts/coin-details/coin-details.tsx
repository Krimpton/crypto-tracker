import React, {FC, useEffect, useState} from 'react';
import "./coin-details.scss";
import {useParams} from "react-router-dom";
import ImageSlider from "../components/slider/imageSlider";
import axios from "axios";
import 'chart.js/auto';
import {useAppDispatch} from "../../hooks/typed-hooks";
import {Chart} from "react-chartjs-2";
import {fetchCurrencyHistory} from "../../store/reducers/ActionCreators";
import moment from "moment";

const CoinDetails: FC = () => {
    const {id} = useParams();

    const [coinData, setCoinData] = useState<any>();
    const baseUrl = 'https://api.coingecko.com/api/v3'
    const apiUrl = `${baseUrl}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`

    useEffect(() => {
        const fetchCoinData = async () => {
            const {data} = await axios.get(apiUrl);
            setCoinData(data);
        }
        fetchCoinData();
    }, [])

    const [historysData, setHistorysDaya] = useState<any>([]);
    const [timeFormat, setTimeFormat] = useState("24h");

    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchHistorysData = async () => {
            const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeFormat}`)
            setHistorysDaya(data.prices)
        }
        fetchHistorysData();
    }, [timeFormat])

    useEffect(() => {
        dispatch(fetchCurrencyHistory())
    }, [])

    const [format, setFormat] = useState('LT');

    const datasss = {
        labels: historysData.map((label: any) => moment(label[0]).format(`${format}`)),
        datasets: [
            {
                label: `${id?.toUpperCase()} CHART`,
                data: historysData.map((item: any) => item[1]),
                backgroundColor: "rgba(0,217,100,0.44)",
                borderColor: "rgba(53,255,146,0.58)",
                pointBackgroundColor: "rgba(0,217,100,0.44)",
                pointBorderColor: "rgba(0,217,100,0.44)",
                pointRadius: 2,
                fill: true,
            },
        ]
    };

    const formatHandler = ({time}: { time: string }, {format}: { format: string }) => {
        setTimeFormat(time)
        setFormat(format)
    }

    const buttonDaysData = [
        {
            label: "1H",
            format: "LT",
        },
        {
            label: "4H",
            format: "LT",
        },
        {
            label: "24H",
            format: "LT",
        },
        {
            label: "7D",
            format: "L",
        },
        {
            label: "30D",
            format: "L",
        },
        {
            label: "365D",
            format: "L",
        },
    ];

    return (
        <>
            {
                coinData && (
                    <div className="wrapper-section">
                        <div className="d-flex justify-content-center align-items-center">
                            <ImageSlider/>
                        </div>

                        <div className="currency-name">{coinData.name} <span
                            className="currency-symbol">{coinData.symbol.toUpperCase()}</span></div>
                        <div className="currency-current-price d-flex">{coinData.market_data.current_price.usd}$ <div
                            className="percentage">
                            {coinData.market_data.market_cap_change_percentage_24h < 0 ? (
                                    <div
                                        className="h24-price-minus d-flex justify-content-center">{coinData.market_data.market_cap_change_percentage_24h?.toFixed(2)}%</div>) :
                                (<div
                                    className="h24-price d-flex justify-content-center">+{coinData.market_data.market_cap_change_percentage_24h?.toFixed(2)}%</div>)}
                            {coinData.market_data.price_change_24h.toFixed(2) < 0 ? (
                                    <div
                                        className="price-changes-sum">{coinData.market_data.price_change_24h.toFixed(2)}$</div>) :
                                (<div
                                    className="price-changes-sum">+{coinData.market_data.price_change_24h.toFixed(2)}$</div>)}
                        </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-end">
                            <div className="price-changes d-flex flex-md-column">
                                <div className="price-changes-24h"><span
                                    className="price-category">24h high:</span> {coinData.market_data.high_24h.usd}$
                                </div>
                                <div className="price-changes-24h"><span
                                    className="price-category-second">24h low:</span> {coinData.market_data.low_24h.usd}$
                                </div>
                            </div>
                        </div>


                        <div className="currency-supply">
                            <div>TOTAL SUPPLY: {coinData.market_data.total_supply}</div>
                            <div>MAX SUPPLY: {coinData.market_data.max_supply}</div>
                        </div>
                        <div className="currency-ranks">
                            <span
                                className="currency-ranks-list">ALEXA RANK: {coinData.public_interest_stats.alexa_rank}</span>
                            <span
                                className="currency-ranks-list">LIQUIDITY SCORE: {coinData.liquidity_score.toFixed(2)}</span>
                        </div>

                        <div className="button-group-chart d-flex justify-content-end">
                            {buttonDaysData.map((day) => (
                                <button
                                    className="button-chart"
                                    onClick={() => formatHandler({time: day.label}, {format: day.format})}>
                                    {day.label}
                                </button>
                            ))}
                            <button className="button-chart"
                                    onClick={() => formatHandler({time: "900"}, {format: "L"})}>ALL
                            </button>
                        </div>
                        <Chart type='line' data={datasss} width={1200} height={600}/>
                    </div>
                )
            }
        </>
    );
};

export default CoinDetails;