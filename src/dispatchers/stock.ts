import { AppDispatch, Stock } from '@/types';

import * as api from '@/api/stock';
import { toast } from 'react-toastify';
import {
    setStockData,
    stockFailure,
    stockRequest,
    stockSuccess,
} from '@/redux/store/stockData';
import { getCustomersData } from '@/api/customers';
import {
    customersSuccess,
    setCustomersData,
} from '@/redux/store/customersData';

export const fetchStockData = () => async (dispatch: AppDispatch) => {
    dispatch(stockRequest());
    try {
        const data: Stock[] = await api.getStock();
        const customerData = [];

        for (const e of data) {
            const res = await getCustomersData(e);
            customerData.push({ ticker: e.ticker, data: res });
        }

        dispatch(setStockData(data));
        dispatch(stockSuccess());

        dispatch(setCustomersData(customerData));
        dispatch(customersSuccess());
    } catch (error) {
        dispatch(stockFailure(error.message));
        console.error(error);
    }
};
