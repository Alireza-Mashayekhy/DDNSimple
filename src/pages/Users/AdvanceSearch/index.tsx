import { useEffect, useState } from 'react';
import * as S from './Styles';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { Button } from 'primereact/button';
import { mdiMagnify } from '@mdi/js';
import { DatePicker } from 'zaman';
import moment from 'moment-jalaali';
import { toast } from 'react-toastify';
import { exportForDate } from '@/api/users';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/types';

const AdvanceSearch = ({
    customerId,
    customerName,
}: {
    customerId: string;
    customerName: string;
}) => {
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const theme = useSelector(getTheme);
    const dispatch = useDispatch<AppDispatch>();

    const dialogStyle = {
        width: '35vw',
        borderRadius: '15px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    };
    const headerStyle = {
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '1rem',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
        textAlign: 'center' as const,
    };
    const contentStyle = {
        padding: '2rem',
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
    };

    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
    };

    const downloadFile = async () => {
        if (
            startDate &&
            endDate &&
            Date.parse(startDate) > Date.parse(endDate)
        ) {
            toast.error('تاریخ های انتخابی معتبر نیستند');
            return;
        }
        try {
            const response = await exportForDate(dispatch, customerId, {
                start_date: startDate,
                end_date: endDate,
            });
            const blob = response;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `جستجوی پیشرفته بازاریاب ${customerName} از ${startDate} تا ${endDate}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('گزارش با موفقیت دریافت شد');
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error('مشکل در دریافت گزارش');
        }
    };

    return (
        <>
            <S.AddButton onClick={() => setChangeStatusModal(true)}>
                <S.AddIcon path={mdiMagnify} size={0.8} />
                <S.AddLabel>جستجوی پیشرفته</S.AddLabel>
            </S.AddButton>
            <S.DialogStyle
                header="گزارش تفصیلی کارمزد بازاریاب"
                visible={changeStatusModal}
                style={dialogStyle}
                headerStyle={headerStyle}
                contentStyle={contentStyle}
                onHide={() => setChangeStatusModal(false)}
                draggable={false}
                resizable={false}
                dismissableMask
            >
                <div className="flex gap-2">
                    <div className="flex items-center relative gap-2 w-full">
                        <span>از:</span>
                        <DatePicker
                            round="x4"
                            position="center"
                            accentColor="#000000"
                            className="z-[10000]"
                            onChange={(e) => {
                                setStartDate(
                                    convertToPersianDate(e.value.toISOString())
                                );
                            }}
                            inputClass={
                                theme === 'dark'
                                    ? 'bg-[#000000] !text-[#ffffff] h-[35px] w-full text-sm !px-0 text-center'
                                    : 'bg-[#FFFFFF] !text-[#000000] h-[35px] w-full text-sm !px-0 text-center'
                            }
                            customShowDateFormat="YY/MM/DD"
                        />
                    </div>
                    <div className="flex items-center relative gap-2 w-full">
                        <span>تا:</span>
                        <DatePicker
                            round="x4"
                            position="center"
                            accentColor="#000000"
                            className="z-[10000]"
                            onChange={(e) => {
                                setEndDate(
                                    convertToPersianDate(e.value.toISOString())
                                );
                            }}
                            inputClass={
                                theme === 'dark'
                                    ? 'bg-[#000000] !text-[#ffffff] h-[35px] w-full text-sm !px-0 text-center'
                                    : 'bg-[#FFFFFF] !text-[#000000] h-[35px] w-full text-sm !px-0 text-center'
                            }
                            customShowDateFormat="YY/MM/DD"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <S.DownloadButton onClick={downloadFile}>
                        دانلود
                    </S.DownloadButton>
                </div>
            </S.DialogStyle>
        </>
    );
};

export default AdvanceSearch;
