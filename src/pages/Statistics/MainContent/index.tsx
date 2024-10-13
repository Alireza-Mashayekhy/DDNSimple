import { SFC } from '@/types';
import * as S from './Styles';
import { Button } from 'primereact/button';
import { DatePicker } from 'zaman';
import { useState } from 'react';
import { exportStatistics, getStatistics } from '@/api/statistics';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getStockData } from '@/selectors/state';
import { TabPanel, TabView } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTable from '@/components/DataTable';
import { getTheme } from '@/redux/selectors';
import moment from 'moment-jalaali';

interface Ticker {
    ticker: string;
}
interface TickerItem {
    ticker: string;
}

const changeColumnFields = [
    {
        field: 'ticker',
        header: 'نماد',
        width: '10%',
    },
    {
        field: 'date',
        header: 'تاریخ',
        width: '10%',
    },
    {
        field: 'customer',
        header: 'نام سهامدار',
        width: '10%',
    },
    {
        field: 'customer_stock_id',
        header: 'کد بورسی',
        width: '10%',
    },
    {
        field: 'previous_quantity',
        header: 'دارایی پیشین',
        width: '10%',
    },
    {
        field: 'present_quantity',
        header: 'دارایی فعلی',
        width: '10%',
    },
    {
        field: 'quantity',
        header: 'تغییرات دارایی',
        width: '10%',
    },
];

const MainContent: SFC = () => {
    const [searchParamsChange, setSearchParamsChange] = useState<any>({
        ticker: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
    });
    const [selectedTicker, setSelectedTicker] = useState<Ticker | undefined>(
        undefined
    );
    const [filteredTickers, setFilteredTickers] = useState<TickerItem[]>([]);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [changeTabData, setChangeTabData] = useState<any>({
        change: null,
        new_investors: null,
        exited_investor: null,
    });
    const [changeActiveIndex, setChangeActiveIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const tickerData = useSelector(getStockData)?.data;
    const theme = useSelector(getTheme);

    const searchTicker = (event: { query: string }) => {
        let query = event.query;
        let filtered = tickerData.filter((item) => item.ticker.includes(query));
        setFilteredTickers(filtered);
    };

    const handleMainPageDownload = async () => {
        try {
            const params = {
                start_date: startDate,
                end_date: endDate,
                ticker: selectedTicker.ticker,
            };
            const response = await exportStatistics(params);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fund_summary_report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('Failed to download report');
        }
    };

    const fetchStatisticsData = async () => {
        setLoading(true);

        console.log(startDate, endDate, selectedTicker.ticker);

        if (!startDate || !endDate || !selectedTicker.ticker) {
            setLoading(false);

            return;
        }
        try {
            const actions = [
                'change',
                'new_investor',
                'exited_investor',
                'hold',
            ];
            actions.forEach(async (e) => {
                const params = {
                    action: e,
                    ticker: selectedTicker.ticker,
                    start_date: startDate,
                    end_date: endDate,
                };

                const response = await getStatistics(params);
                console.log(response);
                const newData = {
                    results: response,
                    count: response.length,
                };
                setChangeTabData((prevData: any) => ({
                    ...prevData,
                    [e]: newData,
                }));
            });
        } catch (error) {
            console.error('Error fetching change tab data:', error);
            setError('لطفا دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
    };

    const renderChangeSubTab = (title: string, action: string) => {
        const data = changeTabData[action];

        return (
            <div className="change-container">
                <div className="page-header flex flex-col items-center">
                    {searchParamsChange.startDate &&
                    searchParamsChange.endDate ? (
                        <h4>
                            {searchParamsChange.startDate} -{' '}
                            {searchParamsChange.endDate}
                        </h4>
                    ) : (
                        <></>
                    )}
                    {searchParamsChange.ticker && (
                        <p>{searchParamsChange.ticker}</p>
                    )}
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
                            style={{ width: '50px', height: '50px' }}
                            strokeWidth="8"
                            fill="transparent"
                            animationDuration=".5s"
                        />
                    </div>
                ) : error ? (
                    <div
                        className="error-message"
                        style={{ textAlign: 'center', color: 'red' }}
                    >
                        {error}
                    </div>
                ) : (
                    <DataTable
                        data={data?.results || []}
                        columnFields={changeColumnFields}
                        totalRecords={data?.count || 0}
                        pagination
                    />
                )}
            </div>
        );
    };

    return (
        <S.Container>
            <div className="change-container">
                <div className="pb-5 pt-10">
                    <div className="data-filter-inputs justify-center flex items-center flex-wrap gap-y-5">
                        <S.Input
                            value={selectedTicker || ''}
                            suggestions={filteredTickers}
                            completeMethod={searchTicker}
                            field="ticker"
                            onChange={(e: { value: Ticker }) => {
                                setSelectedTicker(e.value);
                            }}
                            placeholder="لطفاً یک نماد را انتخاب کنید."
                            panelStyle={{
                                background:
                                    theme === 'dark' ? 'black' : 'white',
                                color: 'red',
                            }}
                        />
                        <div className="flex items-center">
                            {/* <label htmlFor="" className=" mr-4">
                                از تاریخ
                            </label> */}
                            <DatePicker
                                round="x4"
                                position="center"
                                accentColor="#000000"
                                className="z-10"
                                range
                                onChange={(e) => {
                                    setStartDate(
                                        convertToPersianDate(
                                            e.from.toISOString()
                                        )
                                    );
                                    setEndDate(
                                        convertToPersianDate(e.to.toISOString())
                                    );
                                    console.log(e);
                                }}
                                inputClass={
                                    theme === 'dark'
                                        ? 'bg-[#000000] !text-[#ffffff] h-[35px] w-[230px] text-sm !px-0 text-center'
                                        : 'bg-[#FFFFFF] !text-[#000000] h-[35px] w-[230px] text-sm !px-0 text-center'
                                }
                                customShowDateFormat="YY/MM/DD"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8 gap-2 mb-10">
                        <Button
                            label="جستجو"
                            icon="pi pi-search ml-2 text-sm"
                            onClick={() => fetchStatisticsData()}
                            className={` rounded-lg w-32 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            outlined
                        />
                        <Button
                            label="دانلود گزارش"
                            icon="pi pi-download ml-2 text-sm"
                            onClick={handleMainPageDownload}
                            className={` rounded-lg w-32 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            outlined
                        />
                    </div>
                </div>

                <TabView
                    activeIndex={changeActiveIndex}
                    onTabChange={(e) => setChangeActiveIndex(e.index)}
                    className=""
                >
                    <TabPanel header="آمار تغییرات دارایی">
                        {renderChangeSubTab('آمار تغییرات دارایی', 'change')}
                    </TabPanel>
                    <TabPanel header="آمار ورود سهامدار">
                        {renderChangeSubTab(
                            'آمار ورود سهامدار',
                            'new_investor'
                        )}
                    </TabPanel>
                    <TabPanel header="آمار خروج سهامدار">
                        {renderChangeSubTab(
                            'آمار خروج سهامدار',
                            'exited_investor'
                        )}
                    </TabPanel>
                    <TabPanel header="بدون تغییر">
                        {renderChangeSubTab('بدون تغییر', 'hold')}
                    </TabPanel>
                </TabView>
            </div>
        </S.Container>
    );
};

export default MainContent;
