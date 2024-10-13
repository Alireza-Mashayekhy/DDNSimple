import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const getSummery = async (params) => {
    try {
        const url = `${BASE_URL}/funds/summery/`;
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getShareholders = async (params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/`;
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getExportSummery = async (params) => {
    try {
        const url = `${BASE_URL}/funds/summery/export_excel/`;
        const response = await axios.get(url, {
            responseType: 'blob',
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const exportShareholder = async (summaryDetailId, summaryFundName) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/${summaryDetailId}/export_excel/?fund=${decodeURI(summaryFundName)}`;
        const response = await axios.get(url, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getShareholderDetail = async (id, fund) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/${id}/?fund=${encodeURIComponent(fund)}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
