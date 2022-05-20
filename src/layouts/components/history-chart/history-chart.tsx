import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import CoinButtonData from '../../coin-details/coin-button-data';

const HistoryChart: FC = () => {
  const { id } = useParams();
  const [historyData, setHistoryDaya] = useState<number[]>([]);

  const [timeFormat, setTimeFormat] = useState<string>('1h');
  const [format, setFormat] = useState<string>('LT');
  useEffect(() => {
    const fetchHistoryData = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeFormat}`
      );
      setHistoryDaya(data.prices);
    };
    fetchHistoryData();
  }, [id, timeFormat]);

  const chartData = {
    labels: historyData.map((label: any) => moment(label[0]).format(`${format}`)),
    datasets: [
      {
        label: `${id?.toUpperCase()} CHART`,
        data: historyData.map((item: any) => item[1]),
        backgroundColor: 'rgba(0,217,100,0.44)',
        borderColor: 'rgba(53,255,146,0.58)',
        pointBackgroundColor: 'rgba(0,217,100,0.44)',
        pointBorderColor: 'rgba(0,217,100,0.44)',
        pointRadius: 2,
        fill: true,
      },
    ],
  };

  const formatHandler = ({ time }: { time: string }, { formatData }: { formatData: string }) => {
    setTimeFormat(time);
    setFormat(formatData);
  };

  return (
    <>
      <div className="button-group-chart d-flex justify-content-end">
        {CoinButtonData.map((item) => (
          <button
            type="submit"
            className="button-chart"
            key={item.label}
            onClick={() => formatHandler({ time: item.time }, { formatData: item.format })}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Chart type="line" data={chartData} width={1200} height={600} />
    </>
  );
};

export default HistoryChart;
