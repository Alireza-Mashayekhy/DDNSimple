import { sendOtp as _sendOtp } from '@/api/authentication';
import { submitOtp as _submitOtp } from '@/api/authentication';
import { logout as _logout } from '@/api/authentication';
import { persistor } from '@/redux/store';
import { logoutUser } from '@/redux/store/actions';
import { setAuthentication } from '@/redux/store/authentication';
import { setUsersData } from '@/redux/store/users';

export const sendOtp = (data) => async (dispatch) => {
    await _sendOtp(data);

    // dispatch(
    //     setAuthentication({
    //         accessToken: responseData.access,
    //         refreshToken: responseData.refresh,
    //         userData: responseData.userData
    //     })
    // );
};

export const submitOtp = (data) => async (dispatch) => {
    const responseData = await _submitOtp(data);

    dispatch(
        setAuthentication({
            accessToken: responseData.access,
            // refreshToken: responseData.refresh,
            // userData: responseData.user_data,
        })
    );
};

export const updateUserData = (data) => async (dispatch) => {
    console.log(data);
    console.log('data');

    // dispatch(setUsersData(data));
};

export const logout = () => async (dispatch) => {
    dispatch(logoutUser());
    persistor.purge();
    // await _logout();
};
