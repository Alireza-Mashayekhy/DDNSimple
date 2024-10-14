import { authorizationHeaders } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn/customers`;

export const getCustomersData = async () => {
    try {
        const url = `${BASE_URL}/customersdata/`;
        const response = await axios.get(url, authorizationHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
