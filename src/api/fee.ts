import { logout } from '@/dispatchers/authentication';
import { getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn/wagehistory`;

export const getFeeHistory = async () => {
    try {
        const url = `${BASE_URL}/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
        });
        response.data.forEach((el) => {
            el.price = el.value.toFixed(1);
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getFee = async (id, params) => {
    try {
        const url = `${BASE_URL}/${id}`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        response.data.forEach((el) => {
            el.price = el.value.toFixed(1);
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getFeeHistoryParam = async (params) => {
    try {
        const url = `${BASE_URL}/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        response.data.forEach((el) => {
            el.price = el.value.toFixed(1);
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const fetchFeeData = async (params, dispatch) => {
    try {
        const url = `${BASE_URL}/management_wage/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(logout());
        }
    }
};
export const exportFeeData = async (params) => {
    try {
        const url = `${BASE_URL}/management_wage/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
