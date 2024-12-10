import { logout } from '@/dispatchers/authentication';
import { getAccess } from '@/utils/authentication';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}/ddn`;

export const getUploadData = async (dispatch) => {
    try {
        const url = `${BASE_URL}/stockstatus/`;
        const response = await axios.get(url, {
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

export const uploadFile = async (data) => {
    try {
        const url = `${BASE_URL}/fileuploads/`;
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
                Authorization: getAccess(),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
