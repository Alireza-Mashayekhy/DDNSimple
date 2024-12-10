import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTHENTICATION } from '@/constants/store';
import { Authentication } from '@/types';

const initialState: Authentication = {
    accessToken: null,
    refreshToken: null,
    userData: null,
    expiry: null, // اضافه کردن فیلد انقضا
};

const authentication = createSlice({
    initialState,
    name: AUTHENTICATION,
    reducers: {
        setAuthentication: (
            state: Authentication,
            { payload }: PayloadAction<Authentication>
        ) => {
            const now = new Date().getTime();
            if (payload.expiry && now > payload.expiry) {
                return initialState; // اگر منقضی شده، پاک کردن وضعیت
            }
            return payload;
        },
        setUserData: (
            state: Authentication,
            { payload }: PayloadAction<Authentication['userData']>
        ) => {
            state.userData = payload;
        },
        clearAuthentication: () => initialState, // برای پاک کردن وضعیت
    },
});

export const { setAuthentication, setUserData, clearAuthentication } =
    authentication.actions;
export default authentication.reducer;
