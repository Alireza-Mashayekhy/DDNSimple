import { AppDispatch, Users } from '@/types';

import * as api from '@/api/users';
import { toast } from 'react-toastify';
import {
    setUsersData,
    usersFailure,
    usersRequest,
    usersSuccess,
} from '@/redux/store/users';

export const fetchUsersList = () => async (dispatch: AppDispatch) => {
    dispatch(usersRequest());
    try {
        const data: Users[] = await api.getUsersList(dispatch);
        data.map(
            (e) =>
                (e.fee_rate =
                    parseFloat(e.commissions[0].marketing_percent) *
                    parseFloat(e.commissions[0].wage_percent))
        );
        dispatch(setUsersData(data));
        dispatch(usersSuccess());
    } catch (error) {
        toast.error('مشکلی در ارسال داده‌ها رخ داده است');
        dispatch(usersFailure(error.message));
        console.error(error);
        toast.error('خطایی در ثبت رخ داده است');
    }
};
