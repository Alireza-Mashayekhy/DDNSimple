import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users } from '@/types';

interface UsersState {
    data: Users[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    data: [],
    loading: true,
    error: null,
};

const UsersDataSlice = createSlice({
    name: 'usersData',
    initialState,
    reducers: {
        setUsersData: (state, action: PayloadAction<Users[]>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        },
        usersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        usersSuccess: (state) => {
            state.loading = false;
        },
        usersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setUsersData, usersRequest, usersSuccess, usersFailure } =
    UsersDataSlice.actions;
export default UsersDataSlice.reducer;
