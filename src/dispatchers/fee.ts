import { AppDispatch, Fee } from '@/types';

import * as api from '@/api/fee';
import { toast } from 'react-toastify';
import {
    setFeeData,
    feeFailure,
    feeRequest,
    feeSuccess,
} from '@/redux/store/feeData';

export const fetchFeeData = () => async (dispatch: AppDispatch) => {
    dispatch(feeRequest());
    try {
        const data: Fee[] = await api.getFeeHistory();
        dispatch(setFeeData(data));
        dispatch(feeSuccess());
    } catch (error) {
        toast.error('مشکلی در ارسال داده‌ها رخ داده است');
        dispatch(feeFailure(error.message));
        console.error(error);
        toast.error('خطایی در ثبت رخ داده است');
    }
};
