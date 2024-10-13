import {
    authorizationFormHeaders,
    authorizationHeaders,
    getAccess,
} from '@/utils/authentication';
import axios, { AxiosError } from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const getCustomers = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/clclub/customers/`,
            authorizationHeaders()
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const getCustomer = async (customer) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/clclub/customers/${customer.id}/`,
            {
                headers: {
                    Authorization: getAccess(),
                },
                params: {
                    ticker: customer.ticker,
                },
            }
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const updateProfile = async (formData) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/auth/users/${formData.get('national_id')}/`,
            formData,
            authorizationFormHeaders()
        );
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const removeCustomerApi = async ({
    id,
    ticker,
}: {
    id: string;
    ticker: string;
}) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/clclub/customers/${id}/`,
            {
                headers: {
                    Authorization: getAccess(),
                },
                params: {
                    ticker: ticker,
                },
            }
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const exportCustomersData = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/clclub/customers/export/`,
            {
                headers: {
                    Authorization: getAccess(),
                },
                responseType: 'blob',
            }
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const addCustomer = async ({
    national_id,
    ticker,
}: {
    national_id: string;
    ticker: string;
}) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/clclub/customers/`,
            {
                national_id, // Pass directly
                ticker, // Pass directly
            },
            {
                headers: {
                    Authorization: getAccess(),
                },
            }
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const getTickers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/ddn/stock/`, {
            headers: {
                Authorization: getAccess(),
            },
        });
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const getCustomersData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/clclub/customersdata/`, {
            headers: {
                Authorization: getAccess(),
            },
        });
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};

export const exportCustomerData = async (customer) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/clclub/customers/${customer.id}/export_data/`,
            {
                headers: {
                    Authorization: getAccess(),
                },
                params: {
                    ticker: customer.ticker,
                },
                responseType: 'blob',
            }
        );
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.detail || 'خطایی رخ داده است!'
            );
        }
        throw error;
    }
};
