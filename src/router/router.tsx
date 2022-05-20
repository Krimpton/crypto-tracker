import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/layout/layout';
import { WatchListContextProvider } from '../context/watchListContext';

const CoinList = lazy(() => import('../layouts/coin-list/coin-list'));
const CoinDetails = lazy(() => import('../layouts/coin-details/coin-details'));

const Routers = () => {
  return (
    <>
      <WatchListContextProvider>
        <Suspense
          fallback={<div className="spinner-grow text-warning main-spinner" role="status" />}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CoinList />} />
              <Route path="*" element={<CoinList />} />
              <Route path="/coin-list" element={<CoinList />} />
              <Route path="/coin/:id" element={<CoinDetails />} />
            </Route>
          </Routes>
        </Suspense>
      </WatchListContextProvider>
    </>
  );
};

export default Routers;
