import { logout as _logout } from '@/api/authentication';
import { persistor } from '@/redux/store';

export const updateUserData = (data) => async (dispatch) => {
    console.log(data);
    console.log('data');

    // dispatch(setUsersData(data));
};

export const logout = () => async (dispatch) => {
    if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    if (sessionStorage.getItem('accessToken')) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }

    window.dispatchEvent(new Event('storage')); // این رویداد ساختگی storage برای تریگر شدن اثرات استفاده می‌شود

    persistor.purge();
    await _logout();
};
