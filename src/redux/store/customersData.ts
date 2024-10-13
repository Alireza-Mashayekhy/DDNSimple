import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customers } from '@/types';

interface CustomersState {
    data: Customers[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomersState = {
    data: [],
    loading: true,
    error: null,
};

const CustomersDataSlice = createSlice({
    name: 'customersData',
    initialState,
    reducers: {
        setCustomersData: (state, action: PayloadAction<Customers[]>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        },
        customersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        customersSuccess: (state) => {
            state.loading = false;
        },
        customersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setCustomersData,
    customersRequest,
    customersSuccess,
    customersFailure,
} = CustomersDataSlice.actions;
export default CustomersDataSlice.reducer;
