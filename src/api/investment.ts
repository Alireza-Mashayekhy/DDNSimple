import { getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const getSummery = async (params) => {
    try {
        const url = `${BASE_URL}/funds/summary/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSummeryChildren = async (params, id) => {
    try {
        const url = `${BASE_URL}/funds/summary/${id}`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getShareholders = async (params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFundTypes = async () => {
    try {
        const url = `${BASE_URL}/funds/fundtypes/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getExportSummery = async (params) => {
    try {
        const url = `${BASE_URL}/funds/summary/export_excel/`;
        const response = await axios.get(url, {
            responseType: 'blob',
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

export const exportShareholder = async (summaryDetailId, summaryFundName) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/${summaryDetailId}/export_excel/?fund=${decodeURI(summaryFundName)}`;
        const response = await axios.get(url, {
            responseType: 'blob',
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getShareholderDetail = async (id, params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/${id}/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFundNames = async (params) => {
    try {
        const url = `${BASE_URL}/funds/fundnames/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFundsAnalyze = async (params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/analyze/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const exportFundsAnalyze = async (params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/analyze/`;
        const response = await axios.get(url, {
            params,
            responseType: 'blob',
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getFundsChart = async (id, params) => {
    try {
        const url = `${BASE_URL}/funds/shareholders/${id}/chart_data/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
