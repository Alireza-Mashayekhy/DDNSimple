import { store } from '@/redux/store';

export const authorizationFormHeaders = () => {
    const accessToken =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    };
};

export const authorizationHeaders = () => {
    const accessToken =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

export const getAccess = () => {
    const accessToken =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');

    return `Bearer ${accessToken}`;
};

export const getUserData = () => {
    const {
        authentication: { userData },
    } = store.getState();

    return userData;
};

export const getRefreshToken = () => {
    const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken');

    return refreshToken;
};
