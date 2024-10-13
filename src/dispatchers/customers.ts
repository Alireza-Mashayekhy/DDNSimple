import { AppDispatch, Customers } from '@/types';

import * as api from '@/api/customers';
import { toast } from 'react-toastify';
import {
    setCustomersData,
    customersFailure,
    customersRequest,
    customersSuccess,
} from '@/redux/store/customersData';

export const fetchCustomersData = () => async (dispatch: AppDispatch) => {
    dispatch(customersRequest());
    try {
        const data: Customers[] = await api.getCustomersData();
        dispatch(setCustomersData(data));
        dispatch(customersSuccess());
    } catch (error) {
        toast.error('مشکلی در ارسال داده‌ها رخ داده است');
        dispatch(customersFailure(error.message));
        console.error(error);
        toast.error('خطایی در ثبت رخ داده است');
    }
};
