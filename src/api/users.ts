import { logout } from '@/dispatchers/authentication';
import { AppDispatch } from '@/types';
import { authorizationHeaders, getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/auth`;

export const getUsersList = async (dispatch: AppDispatch) => {
    try {
        const url = `${BASE_URL}/marketers/`;
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

export const createUsersList = async (dispatch: AppDispatch, data) => {
    try {
        const url = `${BASE_URL}/marketers/`;
        const response = await axios.post(url, data, authorizationHeaders());
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(logout());
        }
        console.error(error);
        throw error;
    }
};

export const getUser = async (dispatch: AppDispatch, id) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/`;
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

export const editUser = async (dispatch: AppDispatch, id, data) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/`;
        const response = await axios.patch(url, data, authorizationHeaders());
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(logout());
        }
        console.error(error);
        throw error;
    }
};

export const exportUser = async (dispatch: AppDispatch, id) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/export/`;
        const response = await axios.get(url, {
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
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

export const deleteUser = async (dispatch: AppDispatch, id, params) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/delete_customer_detail/`;
        const response = await axios.delete(url, {
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

export const getUserDetail = async (dispatch: AppDispatch, id, params) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/customer_detail/`;
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

export const exportUserDetail = async (dispatch: AppDispatch, id, params) => {
    try {
        const url = `${BASE_URL}/marketers/${id}/export_customer_detail/`;
        const response = await axios.get(url, {
            params,
            headers: {
                Authorization: getAccess(),
            },
            responseType: 'blob',
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
