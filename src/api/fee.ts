import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn/wagehistory`;

export const getFeeHistory = async () => {
    try {
        const url = `${BASE_URL}/`;
        const response = await axios.get(url);
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
        const response = await axios.get(url, { params });
        response.data.forEach((el) => {
            el.price = el.value.toFixed(1);
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const fetchFeeData = async (params) => {
    try {
        const url = `${BASE_URL}/management_wage/`;
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const exportFeeData = async (params) => {
    try {
        const url = `${BASE_URL}/export_management_wage/`;
        const response = await axios.get(url, { params, responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
