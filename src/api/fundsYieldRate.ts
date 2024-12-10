import { logout } from '@/dispatchers/authentication';
import { AppDispatch } from '@/types';
import { authorizationHeaders, getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/v1/fundnav`;

export const getFundsData = async (params) => {
    try {
        const url = `${BASE_URL}/return/`;
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

export const getNames = async (dispatch: AppDispatch, params) => {
    try {
        const url = `${BASE_URL}/names/`;
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
        console.error(error);
        throw error;
    }
};

export const getTypes = async (dispatch: AppDispatch) => {
    try {
        const url = `${BASE_URL}/types/`;
        const response = await axios.get(url, authorizationHeaders());
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(logout());
        }
        console.error(error);
        throw error;
    }
};

export const exportFundnav = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/return/`, {
            params,
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
        });
        return response;
    } catch (error: unknown) {}
};

export const getCashflow = async (params) => {
    try {
        const url = `${BASE_URL}/cashflow/`;
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

export const exportCashflow = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/cashflow/export/`, {
            params,
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
        });
        return response;
    } catch (error: unknown) {}
};

export const getCashflowDetail = async (params) => {
    try {
        const url = `${BASE_URL}/cashflow/get_detail`;
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

export const exportCashflowDetail = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/cashflow/export_data/`, {
            params,
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
        });
        return response;
    } catch (error: unknown) {}
};
