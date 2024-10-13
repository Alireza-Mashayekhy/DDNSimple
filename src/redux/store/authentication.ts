import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTHENTICATION } from '@/constants/store';
import { Authentication } from '@/types';

const initialState: Authentication = {
    accessToken: null,
    // refreshToken: null,
    // userData: null,
};

const authentication = createSlice({
    initialState,
    name: AUTHENTICATION,
    reducers: {
        setAuthentication: (
            state: Authentication,
            { payload }: PayloadAction<Authentication>
        ) => {
            return payload;
        },
        // setUserData: (
        //     state: Authentication,
        //     { payload }: PayloadAction<Authentication['userData']>
        // ) => {
        //     state.userData = payload;
        // },
    },
});

export const { setAuthentication } = authentication.actions;
export default authentication.reducer;
