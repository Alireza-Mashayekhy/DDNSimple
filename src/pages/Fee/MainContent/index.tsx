import { AppDispatch, SFC } from '@/types';
import * as S from './Styles';
import { DatePicker } from 'zaman';
import { Button } from 'primereact/button';
import DataTable from '@/components/DataTable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCustomersData, getFeeData, getStockData } from '@/selectors/state';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import {
    exportFeeData,
    fetchFeeData,
    getFee,
    getFeeHistoryParam,
} from '@/api/fee';
import { getTheme } from '@/redux/selectors';
import moment from 'moment-jalaali';
import { useDispatch } from 'react-redux';
import { fetchFeeData as _fetchFeeData } from '@/dispatchers/fee';
import FeeBack from '@/assets/feeBack.jpg';
import { getAccess } from '@/utils/authentication';
import { fetchCustomersData } from '@/dispatchers/customers';

function numberFormatter(number: number) {
    const isNegative = number < 0;
    const absNumberStr = Math.abs(number).toString();
    const formattedNumber = absNumberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return isNegative ? `(${formattedNumber})` : formattedNumber;
}

const wageColumnFields = [
    {
        field: 'full_name',
        header: 'نام کامل',
        width: '10%',
    },
    {
        field: 'stock_id',
        header: 'کد بورسی',
        width: '10%',
    },
    {
        field: 'inv_type',
        header: 'نوع سهامدار',
        width: '10%',
    },
    {
        field: 'ticker',
        header: 'نماد',
        width: '10%',
    },
    {
        field: 'price',
        header: 'کارمزد مدیر(ریال)',
        width: '10%',
    },
    {
        field: 'tadbir_manager_commission',
        header: 'کارمزد مدیر تدبیر',
        width: '10%',
        body: (data) => {
            return numberFormatter(
                Number(data.tadbir_manager_commission.toFixed(2))
            );
        },
    },
    {
        field: 'tadbir_marketer_commission',
        header: 'کارمزد بازاریاب تدبیر',
        width: '10%',
        body: (data) => {
            return numberFormatter(
                Number(data.tadbir_marketer_commission.toFixed(2))
            );
        },
    },
    {
        field: 'marketer_commission',
        header: 'کارمزد بازاریاب (ریال)',
        width: '10%',
        body: (data) => {
            return numberFormatter(Number(data.marketer_commission.toFixed(2)));
        },
    },
    {
        field: 'details',
        header: 'جزئیات',
        width: '10%',
    },
];

const detailDialogStyle = {
    width: '60vw',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
};
const DetailColumnFields = [
    {
        field: 'date',
        header: 'تاریخ',
        width: '10%',
    },
    {
        field: 'ticker',
        header: 'نماد',
        width: '10%',
    },
    {
        field: 'commission',
        header: 'کارمزد مدیر(ریال)',
        width: '10%',
        body: (data) => {
            return numberFormatter(Number(data.commission));
        },
    },
    {
        field: 'marketer_commission',
        header: 'کارمزد بازاریاب (ریال)',
        width: '10%',
        body: (data) => {
            return numberFormatter(Number(data.marketer_commission.toFixed(2)));
        },
    },
    {
        field: 'tadbir_manager_commission',
        header: 'کارمزد مدیر تدبیر',
        width: '10%',
        body: (data) => {
            return numberFormatter(
                Number(data.tadbir_manager_commission.toFixed(2))
            );
        },
    },
    {
        field: 'tadbir_marketer_commission',
        header: 'کارمزد بازاریاب تدبیر',
        width: '10%',
        body: (data) => {
            return numberFormatter(
                Number(data.tadbir_marketer_commission.toFixed(2))
            );
        },
    },
    {
        field: 'wage',
        header: 'درصد کارمزد مدیر',
        width: '10%',
    },
    {
        field: 'marketer_wage',
        header: 'درصد سهم بازاریاب',
        width: '10%',
    },
];

interface searchedType {
    fund?: string;
    full_name?: string;
    start_date?: string;
    end_date?: string;
    wage?: number;
    stock_id?: string;
    national_id?: string;
}

const MainContent: SFC = () => {
    const [fund, setFund] = useState<string | undefined>('سیناد');
    const [suggestions, setSuggestions] = useState({
        stockId: [],
        fund: [],
        lastname: [],
        nationalId: [],
    });
    const [tickerCustomerData, setTickerCustomerData] = useState({
        stock_ids: [],
        last_names: [],
        national_ids: [],
    });
    const [stockId, setStockId] = useState('');
    const [lastname, setLastname] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [wage, setWage] = useState(0.5);
    const [marketerWage, setMarketerWage] = useState(50);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [wageData, setWageData] = useState<any[]>(
        useSelector(getFeeData)?.data
    );
    const [newWageData, setNewWageData] = useState<any[]>(
        useSelector(getFeeData)?.data
    );
    const [showData, setShowData] = useState(false);
    const [key, setKey] = useState<number>(0);
    const [selectedType, setSelectedType] = useState('نام سهامدار');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [downloadLink, setLink] = useState('');
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [searchedDates, setSearchedDates] = useState({
        startDate: '',
        endDate: '',
    });
    const [detailModal, setDetailModal] = useState(false);
    const [searchedData, setSearchedData] = useState<searchedType>({});
    const [detail, setDetail] = useState([]);

    const [selectedUser, setSelectedUser] = useState({
        full_name: '',
        stock_id: '',
        ticker: '',
        wage: '',
        marketer_wage: '',
    });
    const tickerData = useSelector(getStockData)?.data.map((e) => e.ticker);
    const customerData = useSelector(getCustomersData)?.data;
    const theme = useSelector(getTheme);
    const dispatch = useDispatch<AppDispatch>();

    const [tableHeight, setTableHeight] = useState(window.innerHeight - 570);
    useEffect(() => {
        window.addEventListener('resize', () =>
            setTableHeight(window.innerHeight - 570)
        );
    }, []);

    useEffect(() => {
        setTickerCustomerData(
            customerData.filter((e) => e.ticker === fund)[0].data
        );
    }, [fund]);

    const suggestStockId = (event: { query: string }) => {
        const query = event.query;
        const filteredSuggestions = tickerCustomerData.stock_ids
            .filter((item: any) => item.includes(query))
            .map((item: any) => item);
        setSuggestions((prev: any) => ({
            ...prev,
            stockId: filteredSuggestions,
        }));
    };
    const suggestLastNames = (event: { query: string }) => {
        const query = event.query;
        const filteredSuggestions = tickerCustomerData.last_names
            .filter((item: any) => item.includes(query))
            .map((item: any) => item);
        setSuggestions((prev: any) => ({
            ...prev,
            lastname: filteredSuggestions,
        }));
    };
    const suggestNationalIds = (event: { query: string }) => {
        const query = event.query;
        const filteredSuggestions = tickerCustomerData.national_ids
            .filter((item: any) => item.includes(query))
            .map((item: any) => item);
        setSuggestions((prev: any) => ({
            ...prev,
            nationalId: filteredSuggestions,
        }));
    };

    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
    };

    const fetchManagementWage = async () => {
        setLoading(true);

        if (!fund) {
            setLoading(false);
            return;
        }

        try {
            const params: {
                fund: string;
                full_name?: string;
                start_date?: string;
                end_date?: string;
                wage?: number;
                stock_id?: string;
                national_id?: string;
                marketer_wage?: number;
            } = {
                fund: fund,
            };
            if (selectedType === 'کد بورسی' && stockId) {
                params.stock_id = stockId;
            }
            if (selectedType === 'کد ملی' && nationalId) {
                params.national_id = nationalId;
            }
            if (selectedType === 'نام سهامدار' && lastname) {
                params.full_name = lastname;
            }
            if (startDate) {
                params.start_date = convertToPersianDate(
                    startDate?.toISOString()
                );
            }
            if (endDate) {
                params.end_date = convertToPersianDate(endDate?.toISOString());
            }
            if (wage) {
                params.wage = wage;
            }
            if (marketerWage) {
                params.marketer_wage = marketerWage;
            }
            setSearchedData(params);

            const response = await fetchFeeData(params, dispatch);

            if (response.length) {
                response.forEach((el) => {
                    el.price = el.commission?.toFixed(1);
                });
                setWageData(response);
                setNewWageData(response);
            } else {
                const data = [];
                data.push(response);
                data.forEach((el) => {
                    el.price = el.commission?.toFixed(1);
                });
                setWageData(data);
                setNewWageData(data);
            }
            toast.success('اطلاعات با موفقیت ارسال شد');

            setLoading(false);
        } catch (error) {
            console.error('Error fetching management wage:', error);
            toast.error('مشکل در ارسال اطلاعات');
            setLoading(false);
        }
    };

    const fetchFirstManagementWage = async (e) => {
        setLoading(true);

        if (!e) {
            setLoading(false);
            return;
        }

        try {
            const params = {
                fund: e,
            };

            const response = await getFeeHistoryParam(params);

            response.forEach((el) => {
                el.value = el.value.toFixed(1);
            });
            setWageData(response);
            setNewWageData(response);
            toast.success('اطلاعات با موفقیت ارسال شد');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching management wage:', error);
            toast.error('مشکل در ارسال اطلاعات');
            setLoading(false);
        }
    };

    const downloadRow = async () => {
        const params: { [key: string]: string | number | boolean } = {
            fund: selectedUser.ticker,
            full_name: selectedUser.full_name,
            start_date: searchedData.start_date ? searchedData.start_date : '',
            end_date: searchedData.end_date ? searchedData.end_date : '',
            export: true,
            marketer_wage: selectedUser.marketer_wage,
        };
        params.wage = selectedUser.wage || wage || 0.5;

        try {
            const response = await exportFeeData(params);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `گزارش کارمزد مدیر ${selectedUser.ticker} ${selectedUser.full_name} ${searchedData.start_date}-${searchedData.end_date}.xlsx`
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

    const downloadManagementWage = async () => {
        if (!fund) {
            toast.error('لطفا نماد را وارد کنید');
            return;
        }

        const params: { [key: string]: string | number | boolean } = {
            fund: fund,
            export: true,
        };
        if (wage) {
            params.wage = wage;
        }
        if (marketerWage) {
            params.marketer_wage = marketerWage;
        }
        if (selectedType === 'کد بورسی' && stockId) {
            params.stock_id = stockId;
        }
        if (selectedType === 'کد ملی' && nationalId) {
            params.national_id = nationalId;
        }
        if (selectedType === 'نام سهامدار' && lastname) {
            params.full_name = lastname;
        }
        if (startDate) {
            params.start_date = convertToPersianDate(startDate.toISOString());
        }
        if (endDate) {
            params.end_date = convertToPersianDate(endDate.toISOString());
        }

        try {
            const response = await exportFeeData(params);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `گزارش جامع کارمزد مدیر ${fund} ${searchedData.start_date || ''} ${searchedData.end_date || ''}.xlsx`
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

    const downloadWebsocketFile = async () => {
        window.open(downloadLink, '_blank');
    };

    const filterData = ({ type, stockId }) => {
        if (type === 'code') {
            setNewWageData(
                wageData.filter((e) => e.stock_id.includes(stockId))
            );
        } else if (type === 'name') {
            setNewWageData(
                wageData.filter((e) => e.stock_id.includes(stockId))
            );
        } else if (type === 'national') {
            setNewWageData(
                wageData.filter((e) => e.stock_id.includes(stockId))
            );
        }
    };

    const connectWs = async () => {
        try {
            const wsInstance = new WebSocket(
                `wss://clclub.oxalisys.com/ws/notification/?Authorization=${getAccess()}`
            );

            wsInstance.onmessage = (event) => {
                const receivedData = JSON.parse(event.data);
                setDownloadLoading(false);
                setLink(`https://clclub.oxalisys.com/${receivedData.file_url}`);
                toast.success('گزارش با موفقیت دریافت شد');
            };

            wsInstance.onerror = (error) => {
                console.error('WebSocket error', error);
            };

            setWs(wsInstance);
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
        }
    };

    const handleDetailsClick = async (detail) => {
        const response = await getFee(detail.stock_id, searchedData);
        response.forEach((e) => {
            e.commission = e.commission?.toFixed(1);
        });
        setDetail(response);
        setSelectedUser(detail);
        setDetailModal(true);
    };
    const exportData = async () => {
        if (selectedUser) {
            try {
                const response = await getFee(selectedUser.stock_id, {
                    fund: selectedUser.ticker,
                    export: true,
                });

                const blob = response;

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'fee.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();

                toast.success('گزارش با موفقیت دریافت شد');
            } catch (error) {
                console.error('Error downloading file:', error);
                toast.error('مشکل در دریافت گزارش');
            }
        }
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

    return (
        <div className="relative">
            <S.Background $url={FeeBack} />
            <S.Container>
                <S.DialogStyle
                    header={selectedUser?.full_name}
                    visible={detailModal}
                    style={detailDialogStyle}
                    headerStyle={headerStyle}
                    contentStyle={contentStyle}
                    onHide={() => setDetailModal(false)}
                    dismissableMask
                    draggable={false}
                    resizable={false}
                >
                    <div className="flex justify-end mb-5">
                        <Button
                            onClick={downloadRow}
                            icon="pi pi-download"
                            text
                            className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        />
                    </div>
                    <DataTable
                        data={detail}
                        columnFields={DetailColumnFields}
                        pagination
                    />
                </S.DialogStyle>
                <h1 className="text-right mb-10 px-10 text-4xl">
                    محاسبه کارمزد مدیر
                </h1>
                <div className="change-container">
                    <div className="p-5 pt-0">
                        <div className="flex justify-center mb-6">
                            <S.DropDownStyle
                                options={tickerData}
                                value={fund || ''}
                                onChange={(e: { value: string }) => {
                                    setFund(e.value);
                                }}
                                panelStyle={{
                                    background:
                                        theme === 'dark' ? 'black' : 'white',
                                    color: 'red',
                                }}
                                placeholder="نام صندوق"
                            />
                        </div>
                        <>
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <div className="data-filter-inputs flex justify-center items-center gap-6 w-full flex-wrap">
                                    <div className="flex  gap-2 flex-col">
                                        <label
                                            htmlFor="stockId"
                                            className="w-full text-right"
                                        >
                                            عنوان :
                                        </label>
                                        <S.DropDownStyle
                                            options={[
                                                'نام سهامدار',
                                                'کد بورسی',
                                                'کد ملی',
                                            ]}
                                            value={selectedType || ''}
                                            onChange={(e: {
                                                value: string;
                                            }) => {
                                                setSelectedType(e.value);
                                            }}
                                            panelStyle={{
                                                background:
                                                    theme === 'dark'
                                                        ? 'black'
                                                        : 'white',
                                                color: 'red',
                                            }}
                                        />
                                    </div>
                                    {selectedType === 'نام سهامدار' ? (
                                        <div className="flex  gap-2 flex-col">
                                            <label
                                                htmlFor="stockId"
                                                className="w-20"
                                            >
                                                نام سهامدار :
                                            </label>
                                            <S.Input
                                                value={lastname}
                                                suggestions={
                                                    suggestions.lastname
                                                }
                                                completeMethod={
                                                    suggestLastNames
                                                }
                                                onChange={(e) =>
                                                    setLastname(e.value)
                                                }
                                                placeholder="نام سهامدار"
                                                panelStyle={{
                                                    background:
                                                        theme === 'dark'
                                                            ? 'black'
                                                            : 'white',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    ) : selectedType === 'کد بورسی' ? (
                                        <div className="flex  gap-2 flex-col">
                                            <label
                                                htmlFor="stockId"
                                                className="w-20"
                                            >
                                                کد بورسی :
                                            </label>
                                            <S.Input
                                                value={stockId}
                                                suggestions={
                                                    suggestions.stockId
                                                }
                                                completeMethod={suggestStockId}
                                                onChange={(e) =>
                                                    setStockId(e.value)
                                                }
                                                placeholder="کد بورسی"
                                                panelStyle={{
                                                    background:
                                                        theme === 'dark'
                                                            ? 'black'
                                                            : 'white',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex  gap-2 flex-col">
                                            <label
                                                htmlFor="stockId"
                                                className="w-20"
                                            >
                                                کد ملی :
                                            </label>
                                            <S.Input
                                                value={nationalId}
                                                suggestions={
                                                    suggestions.nationalId
                                                }
                                                completeMethod={
                                                    suggestNationalIds
                                                }
                                                onChange={(e) =>
                                                    setNationalId(e.value)
                                                }
                                                placeholder="کد ملی"
                                                panelStyle={{
                                                    background:
                                                        theme === 'dark'
                                                            ? 'black'
                                                            : 'white',
                                                    color: 'red',
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex  gap-2 flex-col">
                                        <label
                                            htmlFor="stockId"
                                            className="whitespace-nowrap text-start"
                                        >
                                            نرخ کارمزد (%) :
                                        </label>
                                        <S.NumInput
                                            value={wage}
                                            onValueChange={(e) =>
                                                setWage(e.value ?? 0)
                                            }
                                            minFractionDigits={0}
                                            maxFractionDigits={3}
                                            step={0.5}
                                            placeholder="نرخ کارمزد"
                                            mode="decimal"
                                            min={0}
                                            max={100}
                                        />
                                    </div>
                                    <div className="flex  gap-2 flex-col">
                                        <label
                                            htmlFor="stockId"
                                            className="whitespace-nowrap text-start"
                                        >
                                            درصد بازاریاب (%) :
                                        </label>
                                        <S.NumInput
                                            value={marketerWage}
                                            onValueChange={(e) =>
                                                setMarketerWage(e.value ?? 0)
                                            }
                                            minFractionDigits={0}
                                            maxFractionDigits={3}
                                            step={0.5}
                                            placeholder="درصد بازاریاب"
                                            mode="decimal"
                                            min={0}
                                            max={100}
                                        />
                                    </div>
                                    <div className="flex relative gap-2 flex-col">
                                        <div className="flex items-center gap-32 mx-5">
                                            <span>از:</span>
                                            <span>تا:</span>
                                        </div>
                                        <DatePicker
                                            key={key}
                                            className="z-10"
                                            round="x4"
                                            position="center"
                                            range
                                            // accentColor={theme === "dark" ? "#000000" : "#FFFFFF"}
                                            onChange={(e) => {
                                                setStartDate(e.from),
                                                    setEndDate(e.to);
                                            }}
                                            inputClass={
                                                theme === 'dark'
                                                    ? 'bg-[#000000] !text-[#ffffff] h-[35px] w-[230px] text-sm !px-0 text-center'
                                                    : 'bg-[#FFFFFF] !text-[#000000] h-[35px] w-[230px] text-sm !px-0 text-center'
                                            }
                                            customShowDateFormat="YY/MM/DD"
                                        />
                                        <Button
                                            onClick={() => {
                                                setEndDate(null);
                                                setStartDate(null);
                                                setKey(
                                                    (prevKey) => prevKey + 1
                                                );
                                            }}
                                            className="absolute left-4 top-8 aspect-square h-8 w-8 max-w-8 min-w-0 p-0 justify-center"
                                            text
                                        >
                                            <i className="pi pi-times"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-8 gap-2 mb-10">
                                <Button
                                    label="جستجو"
                                    icon="pi pi-search ml-2 text-sm"
                                    onClick={fetchManagementWage}
                                    className={` rounded-lg w-28 text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                    outlined
                                />
                                <Button
                                    label="دانلود گزارش جامع کارمزد"
                                    icon="pi pi-download ml-2 text-sm"
                                    onClick={downloadManagementWage}
                                    className={` rounded-lg text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                    outlined
                                />
                                {/* {downloadLoading ? (
                                    <div className="relative">
                                        <Button
                                            label="درحال تولید گزارش جامع کارمزد"
                                            className={` rounded-lg text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                            outlined
                                            disabled
                                        />
                                        {searchedDates.startDate && (
                                            <div className="flex whitespace-nowrap items-center gap-2 absolute -bottom-8">
                                                از{' '}
                                                <div>
                                                    {searchedDates.startDate}
                                                </div>{' '}
                                                تا{' '}
                                                <div>
                                                    {searchedDates.endDate}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : downloadLink ? (
                                    <div className="relative">
                                        <Button
                                            label="دانلود گزارش جامع کارمزد"
                                            icon="pi pi-download ml-2 text-sm"
                                            onClick={downloadWebsocketFile}
                                            className={` rounded-lg text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                            outlined
                                        />
                                        <div className="flex whitespace-nowrap items-center gap-2 absolute -bottom-8">
                                            از تاریخ{' '}
                                            <div>{searchedDates.startDate}</div>{' '}
                                            تا تاریخ{' '}
                                            <div>{searchedDates.endDate}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        label="گزارش جامع کارمزد (بازه تاریخی)"
                                        className={` rounded-lg text-sm py-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                        outlined
                                        disabled
                                    />
                                )} */}
                            </div>
                            {loading ? (
                                <div
                                    className="spinner-container"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '200px',
                                    }}
                                >
                                    <ProgressSpinner
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                        strokeWidth="8"
                                        fill="transparent"
                                        animationDuration=".5s"
                                    />
                                </div>
                            ) : error ? (
                                <div
                                    className="error-message"
                                    style={{
                                        textAlign: 'center',
                                        color: 'red',
                                    }}
                                >
                                    {error}
                                </div>
                            ) : (
                                <DataTable
                                    data={newWageData}
                                    columnFields={wageColumnFields}
                                    totalRecords={newWageData.length}
                                    pagination={true}
                                    onDetailsClick={handleDetailsClick}
                                    scrollHeight={tableHeight + 'px'}
                                />
                            )}
                        </>
                    </div>
                </div>
            </S.Container>
        </div>
    );
};

export default MainContent;
