import { getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn`;

export const getDdnHistories = async (params) => {
    try {
        const url = `${BASE_URL}/ddnhistories/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getDdnDetail = async (id, params) => {
    try {
        const url = `${BASE_URL}/customers/${id}/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const exportDdn = async (id, params) => {
    try {
        const url = `${BASE_URL}/customers/${id}/export/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
            params,
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
