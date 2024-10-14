import { authorizationHeaders, getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn`;

export const getUploadData = async () => {
    try {
        const url = `${BASE_URL}/stockstatus/`;
        const response = await axios.get(url, authorizationHeaders());
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const uploadFile = async (data) => {
    try {
        const url = `${BASE_URL}/fileuploads/`;
        const response = await axios.post(url, data, {
            headers: {
                Authorization: getAccess(),
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
