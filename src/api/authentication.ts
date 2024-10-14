import { getRefreshToken } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const login = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/token/`, data);
        return response.data;
    } catch (error) {
        console.error(error);
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
