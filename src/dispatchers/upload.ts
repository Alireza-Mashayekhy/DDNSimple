import { AppDispatch } from '@/types';
import {
    setUploadData,
    uploadFailure,
    uploadRequest,
    uploadSuccess,
} from '@/redux/store/uploadData';
import * as api from '@/api/upload';
import { Upload } from '@/types';
import { toast } from 'react-toastify';

export const fetchUploadData = () => async (dispatch: AppDispatch) => {
    dispatch(uploadRequest());
    try {
        const data: Upload[] = await api.getUploadData();
        dispatch(setUploadData(data));
        dispatch(uploadSuccess());
    } catch (error) {
        toast.error('مشکلی در ارسال داده‌ها رخ داده است');
        dispatch(uploadFailure(error.message));
        console.error(error);
        toast.error('خطایی در ثبت رخ داده است');
    }
};
