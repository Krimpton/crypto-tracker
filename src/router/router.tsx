import React, {lazy} from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

const MainPage = lazy(() => import('./layouts/main-page/main-page'));

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path='/crypto-tracker' element={<MainPage/>}/>
            </BrowserRouter>
        </div>
    );
}

export default Router;
