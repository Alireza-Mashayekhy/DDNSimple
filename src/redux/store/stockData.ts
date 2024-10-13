import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '@/types';

interface StockState {
    data: Stock[];
    loading: boolean;
    error: string | null;
}

const initialState: StockState = {
    data: [],
    loading: true,
    error: null,
};

const StockDataSlice = createSlice({
    name: 'stockData',
    initialState,
    reducers: {
        setStockData: (state, action: PayloadAction<Stock[]>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        },
        stockRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        stockSuccess: (state) => {
            state.loading = false;
        },
        stockFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setStockData, stockRequest, stockSuccess, stockFailure } =
    StockDataSlice.actions;
export default StockDataSlice.reducer;
