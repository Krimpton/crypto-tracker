import {ICurrency} from "../../models/ICurrency";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCurrency} from "./ActionCreators";

interface CurrencyState {
    currency: ICurrency[];
    isLoading: boolean;
    error: string;
}

const initialState: CurrencyState = {
    currency: [],
    isLoading: false,
    error: ''
}

export const currencySlice = createSlice({
        name: 'currency',
        initialState,
        reducers: {
            // filterByTraded(state, action: PayloadAction<any>) {
                // const copyData = state.currency.concat
                // const currencys = state.currency;
                // const copyDatas: any[] = currencys.market_cap.sort((n1: number, n2: number) => n1 - n2)
                // return copyData.atl.sort((a: any,b: any) => a - b)
                // const filteredByTraded: any = initialState.currency.concat().sort((n1, n2) => n1.current_price + n2.current_price)
                // console.log(filteredByTraded)
            // },
            // filterSelectedCoin(state, action: PayloadAction<any>) {
            //     state.currency.filter((coin-card) => coin-card.name === action.payload.name)
            // }
        },
        extraReducers: {
            [fetchCurrency.fulfilled.type]: (state, action: PayloadAction<ICurrency[]>) => {
                state.isLoading = false;
                state.error = '';
                state.currency = action.payload;
            },
            [fetchCurrency.pending.type]: (state, action: PayloadAction<ICurrency[]>) => {
                state.isLoading = true;

            },
            [   fetchCurrency.rejected.type]: (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            },
        }
    }
)

export default currencySlice.reducer;
// export const {filterSelectedCoin, filterByTraded} = currencySlice.actions;