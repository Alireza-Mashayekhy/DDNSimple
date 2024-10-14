import { getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn/ILstatus`;

export const getILStatus = async (params) => {
    try {
        const url = `${BASE_URL}/`;
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

export const exportILStatus = async (params) => {
    try {
        const url = `${BASE_URL}/export/`;
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

export const getChartILStatus = async (params) => {
    try {
        const url = `${BASE_URL}/chart_data/`;
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
