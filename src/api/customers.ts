import { authorizationHeaders } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const getCustomersData = async (params) => {
    try {
        const url = `${BASE_URL}/ddn/customers/customersdata/`;
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const searchCustomers = async (data) => {
    try {
        const url = `${BASE_URL}/clclub/customers/search_customer/`;
        const response = await axios.post(url, data, authorizationHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const transactionsCustomers = async (data) => {
    try {
        const url = `${BASE_URL}/v1/transactions/`;
        const response = await axios.post(url, data, authorizationHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
