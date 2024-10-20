import { useEffect, useState } from 'react';
import { DatePicker } from 'zaman';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from 'moment-jalaali';
import * as S from './Styles';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import DataTable from '@/components/DataTable';
import { getStockData } from '@/selectors/state';
import { exportILStatus, getChartILStatus, getILStatus } from '@/api/ilstatus';
import LineChart from '@/components/chart';
import LegalBack from '@/assets/legalBack.jpg';

interface TickerItem {
    ticker: string;
}
interface Ticker {
    ticker: string;
}

const columnFields = [
    {
        field: 'date',
        header: 'تاریخ',
        width: '10%',
    },
    {
        field: 'individual_count',
        header: 'تعداد حقیقی',
        width: '10%',
    },
    {
        field: 'individual_total_sum',
        header: 'مجموع حقیقی',
        width: '10%',
    },
    {
        field: 'legal_count',
        header: 'تعداد حقوقی',
        width: '10%',
    },
    {
        field: 'legal_total_sum',
        header: 'مجموع حقوقی',
        width: '10%',
    },
];
const Investment = () => {
    const [filteredTickers, setFilteredTickers] = useState<TickerItem[]>([]);
    const [selectedTicker, setSelectedTicker] = useState<Ticker | undefined>(
        undefined
    );

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showTable, setShowTable] = useState(false);
    const [iLStatusData, setILStatusData] = useState([]);
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { name: string; data: number[]; borderColor: string }[];
    }>({ labels: [], datasets: [] });
    const [displayModal, setDisplayModal] = useState(false);

    const theme = useSelector(getTheme);
    const tickerData = useSelector(getStockData)?.data;

    const [tableHeight, setTableHeight] = useState(window.innerHeight - 450);
    useEffect(() => {
        window.addEventListener('resize', () =>
            setTableHeight(window.innerHeight - 450)
        );
    }, []);
    const searchTicker = (event: { query: string }) => {
        let query = event.query;
        let filtered = tickerData.filter((item) => item.ticker.includes(query));
        setFilteredTickers(filtered);
    };

    const handleDateChange = (value: any) => {};

    function numberFormatter(number: number) {
        const isNegative = number < 0;
        const absNumberStr = Math.abs(number).toString();
        const formattedNumber = absNumberStr.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
        );
        return isNegative ? `(${formattedNumber})` : formattedNumber;
    }

    const fetchData = async (ticker) => {
        setError(null);
        setLoading(true);
        try {
            const res = await getILStatus({ ticker: ticker.ticker });
            res.forEach((e) => {
                e.individual_count = numberFormatter(e.individual_count);
                e.individual_total_sum = numberFormatter(
                    e.individual_total_sum
                );
                e.legal_count = numberFormatter(e.legal_count);
                e.legal_total_sum = numberFormatter(e.legal_total_sum);
            });
            setILStatusData(res);
            setLoading(false);
        } catch (error) {
            setError('لطفا دوباره تلاش کنید');
            setLoading(false);
        }
    };

    const fetchChart = async (ticker) => {
        try {
            const res = await getChartILStatus({ ticker: ticker.ticker });
            const chartData = {
                labels: res[0].dates,
                datasets: [
                    {
                        name: 'حقیقی',
                        data: res[0].individual_count,
                        borderColor: theme === 'dark' ? 'white' : 'black',
                    },
                    {
                        name: 'حقوقی',
                        data: res[0].legal_count,
                        borderColor: theme === 'dark' ? 'white' : 'black',
                    },
                ],
            };
            setChartData(chartData);
        } catch (error) {
            console.log(error);
            setError('لطفا دوباره تلاش کنید');
        }
    };

    const downloadData = async () => {
        try {
            const params = {
                ticker: selectedTicker.ticker,
            };
            const response = await exportILStatus(params);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Indv_Inst_History.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('خطا در دریافت فایل . لطفا دوباره تلاش کنید');
        }
    };

    const headerStyle = {
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '1rem',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
    };

    const contentStyle = {
        padding: '2rem',
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
    };

    return (
        <PrimeReactProvider>
            <div className="relative">
                <S.DialogStyle
                    // header="جزییات سهامدار"
                    headerStyle={headerStyle}
                    dismissableMask
                    contentStyle={contentStyle}
                    visible={displayModal}
                    style={{ width: '80vw', maxWidth: '800px' }}
                    onHide={() => setDisplayModal(false)}
                >
                    <div className="w-full">
                        <LineChart
                            datasets={chartData.datasets}
                            labels={chartData.labels}
                        />
                    </div>
                </S.DialogStyle>
                <S.Background $url={LegalBack} />

                <div className="p-5 pt-12 relative">
                    <h1 className="text-right mb-10 px-10 text-4xl">
                        آمار سرمایه‌گذاران حقیقی و حقوقی
                    </h1>

                    <div className="flex flex-col gap-5 items-center py-5 justify-center">
                        <div className="data-filter-inputs items-center">
                            <S.Input
                                value={selectedTicker || ''}
                                suggestions={filteredTickers}
                                completeMethod={searchTicker}
                                field="ticker"
                                onChange={(e: { value: Ticker }) => {
                                    setSelectedTicker(e.value);
                                }}
                                onSelect={(e: { value: Ticker }) => {
                                    fetchData(e.value);
                                    fetchChart(e.value);
                                    setShowTable(true);
                                }}
                                panelStyle={{
                                    background:
                                        theme === 'dark' ? 'black' : 'white',
                                    color: 'red',
                                }}
                                placeholder="لطفاً یک نماد را انتخاب کنید."
                            />
                            {showTable && (
                                <>
                                    <label htmlFor="" className=" mr-4 ml-2">
                                        تاریخ
                                    </label>

                                    <DatePicker
                                        round="x4"
                                        position="center"
                                        className="z-10"
                                        onChange={(e) => handleDateChange(e)}
                                        inputClass={
                                            theme === 'dark'
                                                ? 'bg-[#000000] !text-[#ffffff] !mx-0 h-[35px] w-[190px] text-sm'
                                                : 'bg-[#FFFFFF] !text-[#000000] !mx-0 h-[35px] w-[190px] text-sm'
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    {showTable && (
                        <>
                            <div className="flex gap-2 justify-end mb-5">
                                <Button
                                    icon="pi pi-chart-line text-2xl"
                                    className={` rounded-lg aspect-square p-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                    text
                                    onClick={() => setDisplayModal(true)}
                                />
                                <Button
                                    icon="pi pi-download text-2xl"
                                    className={` rounded-lg aspect-square p-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                    text
                                    onClick={downloadData}
                                />
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
                                    data={iLStatusData}
                                    columnFields={columnFields}
                                    totalRecords={iLStatusData.length}
                                    pagination
                                    scrollHeight={tableHeight + 'px'}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </PrimeReactProvider>
    );
};

export default Investment;
