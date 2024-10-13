import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Upload } from '@/types';

interface UploadState {
    data: Upload[];
    loading: boolean;
    error: string | null;
}

const initialState: UploadState = {
    data: [],
    loading: true,
    error: null,
};

const UploadDataSlice = createSlice({
    name: 'uploadData',
    initialState,
    reducers: {
        setUploadData: (state, action: PayloadAction<Upload[]>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        },
        uploadRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        uploadSuccess: (state) => {
            state.loading = false;
        },
        uploadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setUploadData, uploadRequest, uploadSuccess, uploadFailure } =
    UploadDataSlice.actions;
export default UploadDataSlice.reducer;
