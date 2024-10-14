import { authorizationHeaders } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn`;

export const getStock = async () => {
    try {
        const url = `${BASE_URL}/stock/`;
        const response = await axios.get(url, authorizationHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
