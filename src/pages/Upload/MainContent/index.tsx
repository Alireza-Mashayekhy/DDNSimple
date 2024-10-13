import { AppDispatch, SFC } from '@/types';
import * as S from './Styles';
import DataTable from '@/components/DataTable';
import { useSelector } from 'react-redux';
import { getUploadData } from '@/selectors/state';
import { useEffect, useRef, useState } from 'react';
import { uploadFile } from '@/api/upload';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUploadData } from '@/dispatchers/upload';
import { colors } from '@/styles';

interface ColumnField {
    field: string;
    header: string;
    width: string;
}
interface StockData {
    ticker: string;
    history_status: { trade_date: string; has_ddn_history: boolean }[];
}

const MainContent: SFC = () => {
    const [columnUploadFields, setColumnUploadFields] = useState<ColumnField[]>(
        []
    );
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const data = useSelector(getUploadData)?.data;
    useEffect(() => {
        if (data && data.length > 0) {
            const dates = data[0].history_status.map(
                (status: any) => status.trade_date
            );
            const tickers = data.map((item: any) => item.ticker);
            const transformedData = dates.map((date: any) => {
                const rowData: any = { date };
                tickers.forEach((ticker: any) => {
                    const stockItem = data.find(
                        (item: any) => item.ticker === ticker
                    );
                    const statusForDate = stockItem.history_status.find(
                        (status: any) => status.trade_date === date
                    );
                    rowData[ticker] = statusForDate
                        ? statusForDate.has_ddn_history
                            ? true
                            : false
                        : null;
                });
                return rowData;
            });
            const newColumnFields: ColumnField[] = [
                { field: 'date', header: 'تاریخ', width: '15%' },
                ...tickers.map((ticker: any) => ({
                    field: ticker,
                    header: ticker,
                    width: `${85 / tickers.length}%`,
                })),
            ];
            setColumnUploadFields(newColumnFields);
            setStockData(transformedData);
        }
    }, [data]);

    const handleMultipleFileUpload = async (files: FileList) => {
        try {
            const formData = new FormData();
            setIsUploading(true);

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i], files[i].name);
            }

            await uploadFile(formData);

            await dispatch(fetchUploadData());

            toast.success('بارگذاری فایل‌ها با موفقیت انجام شد');
        } catch (error) {
            toast.error('خطا در بارگذاری فایل‌ها');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleOpenFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files);
            handleMultipleFileUpload(e.target.files);
        }
    };

    return (
        <S.Container>
            <div className="data-filter flex !justify-center">
                <S.UploadContainer>
                    <input
                        type="file"
                        id="multipleFileUpload"
                        ref={fileInputRef}
                        multiple
                        style={{ display: 'none' }}
                        accept=".xlsx"
                        onChange={handleFileChange}
                    />
                    <S.SCloudUploadIcon fontColor={colors.palette.blue[300]} />

                    <S.StyledButton
                        fontColor={colors.palette.blue[300]}
                        onClick={handleOpenFile}
                        disabled={isUploading}
                    >
                        {isUploading
                            ? 'در حال ارسال...'
                            : 'فایل‌های DDN را بارگذاری نمایید'}
                    </S.StyledButton>
                </S.UploadContainer>
            </div>
            <DataTable
                data={stockData}
                columnFields={columnUploadFields}
                upload={true}
                pagination
            />
        </S.Container>
    );
};

export default MainContent;
