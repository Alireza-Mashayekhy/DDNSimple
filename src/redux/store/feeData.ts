import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fee } from '@/types';

interface FeeState {
    data: Fee[];
    loading: boolean;
    error: string | null;
}

const initialState: FeeState = {
    data: [],
    loading: true,
    error: null,
};

const FeeDataSlice = createSlice({
    name: 'feeData',
    initialState,
    reducers: {
        setFeeData: (state, action: PayloadAction<Fee[]>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        },
        feeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        feeSuccess: (state) => {
            state.loading = false;
        },
        feeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setFeeData,
    feeRequest,
    feeSuccess,
    feeFailure,
} = FeeDataSlice.actions;
export default FeeDataSlice.reducer;
