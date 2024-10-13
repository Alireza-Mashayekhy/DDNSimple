import { getRefreshToken } from '@/utils/authentication';
import axios from 'axios';

import { toast } from 'react-toastify';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const sendOtp = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/entry/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('خطایی در ورود کاربر رخ داده است');
        throw error;
    }
};

export const submitOtp = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/verify-otp/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('خطایی در ورود کاربر رخ داده است');
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/token/blacklist/`, {
            refresh: getRefreshToken(),
        });
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error("خطایی در خروج کاربر رخ داده است");
        throw error;
    }
};
