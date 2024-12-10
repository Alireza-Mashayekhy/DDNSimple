import { SFC } from '@/types';
import * as S from './Styles';
import { Button } from 'primereact/button';
import { DatePicker } from 'zaman';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DataTable from '@/components/DataTable';
import { getTheme } from '@/redux/selectors';
import moment from 'moment-jalaali';
import StatisticsBack from '@/assets/statisticsBack.jpg';
import {
    exportFundsAnalyze,
    getFundNames,
    getFundsAnalyze,
    getFundsChart,
    getFundTypes,
} from '@/api/investment';
import Chart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

const MainContent: SFC = () => {
    const [analyseData, setAnalyseData] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState({
        name: 'همه',
        code: '',
    });
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [loadingData, setLoading] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);

    const [searchedData, setSearchedData] = useState({
        ticker: '',
        start_date: '',
        end_date: '',
    });
    const [autoCompleteValues, setAutoCompleteValues] = useState({
        lastName: '',
    });
    const [suggestions, setSuggestions] = useState<any>({ lastName: [] });
    const [summaryData, setSummaryData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [searchedDate, setSearchedDate] = useState({
        startDate: '',
        endDate: '',
    });

    const [key, setKey] = useState<number>(0);
    const [fundsList, setFundsList] = useState([]);
    const theme = useSelector(getTheme);

    const [chartSeries, setChartSeries] = useState([]);
    const [chartDates, setChartDates] = useState([]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const fetchChartData = async (data) => {
        try {
            const response = await getFundsChart(data.pk, {
                end_date: searchedData.end_date,
                ticker: searchedData.ticker,
                start_date: searchedData.start_date,
            });
            const chartData = response.chart_data;
            if (chartData) {
                const randomColor = getRandomColor();
                setChartSeries((prevSeries) => [
                    ...prevSeries,
                    {
                        name: `${data.share_holder}`,
                        data: chartData.share_counts,
                        color: randomColor,
                    },
                ]);

                if (chartDates.length === 0) {
                    setChartDates(chartData.dates);
                }
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };
    const removeChartData = (data) => {
        setChartSeries((prevSeries) =>
            prevSeries.filter((series) => series.name !== data.ticker)
        );
    };

    const checkSelectedData = async (checked, data) => {
        setSelectedData((prevSelectedData) => {
            if (checked) {
                fetchChartData(data);
                return [...prevSelectedData, data];
            } else {
                removeChartData(data);
                return prevSelectedData.filter((c) => c !== data);
            }
        });
    };

    const changeColumnFields = [
        {
            field: 'show',
            header: 'نمایش',
            width: '10%',
            body: (data) => {
                return (
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            id="tableCheckbox"
                            className="cursor-pointer w-5 h-5 m-0"
                            onChange={(e) =>
                                checkSelectedData(e.target.checked, data)
                            }
                        />
                    </div>
                );
            },
        },
        {
            field: 'ticker',
            header: 'نام صندوق',
            width: '10%',
        },
        {
            field: 'share_holder',
            header: 'نام سهامدار',
            width: '10%',
            sortable: true,
        },
        {
            field: 'previous_quantity',
            header: 'سهام پیشین',
            width: '10%',
            sortable: true,
        },
        {
            field: 'present_quantity',
            header: 'سهام پسین',
            width: '10%',
        },
        {
            field: 'quantity',
            header: 'تغییرات',
            width: '10%',
            sortable: true,
        },
        {
            field: 'action',
            header: 'وضعیت',
            width: '10%',
            sortable: true,
            body: (data) => {
                switch (data.action) {
                    case 'hold':
                        return 'بدون تغییر';
                    case 'new':
                        return 'ورود';
                    case 'sell':
                        return 'فروش';
                    case 'buy':
                        return 'خرید';
                    case 'exited':
                        return 'خروج';
                }
            },
        },
    ];

    const getFundTypesList = async () => {
        const res = await getFundTypes();
        res.forEach((element) => {
            element.code = element.id;
        });
        res.push({ name: 'همه', code: '' });
        const result = res.map(({ id, ...rest }) => rest);
        setFundsList(result);
        const res2 = await getFundNames({});
        setSummaryData(res2);
    };

    useEffect(() => {
        getFundTypesList();
    }, []);

    const suggestLastName = (event: any) => {
        const query = event.query.toLowerCase();
        const filteredSuggestions = summaryData
            .map((item: any) => item.ticker)
            .filter((ticker: any) => ticker.toLowerCase().includes(query));
        setSuggestions({ ...suggestions, lastName: filteredSuggestions });
    };

    const fundChanged = async (e) => {
        if (e.value.code) {
            const res = await getFundNames({ fund_type: e.value.code });
            setSummaryData(res);
        } else {
            const res = await getFundNames({});
            setSummaryData(res);
        }
    };

    const [tableHeight, setTableHeight] = useState(window.innerHeight - 450);
    useEffect(() => {
        window.addEventListener('resize', () =>
            setTableHeight(window.innerHeight - 450)
        );
    }, []);

    const handleMainPageDownload = async () => {
        try {
            setLoadingDownload(true);
            const params = {
                start_date: searchedData.start_date,
                end_date: searchedData.end_date,
                ticker: searchedData.ticker,
                export: true,
            };
            const response = await exportFundsAnalyze(params);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `گزارش_تغییرات ${searchedData.ticker} از تاریخ ${searchedData.start_date} تا تاریخ ${searchedData.end_date}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoadingDownload(false);
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('Failed to download report');
            setLoadingDownload(false);
        }
    };

    const fetchStatisticsData = async () => {
        setLoading(true);
        setSelectedData([]);
        setChartSeries([]);
        setChartDates([]);

        const inputs =
            document.querySelectorAll<HTMLInputElement>('#tableCheckbox');
        inputs.forEach((input) => {
            input.checked = false;
        });

        if (!startDate || !endDate || !autoCompleteValues.lastName) {
            setLoading(false);
            return;
        }
        try {
            const params = {
                ticker: autoCompleteValues.lastName,
                start_date: startDate,
                end_date: endDate,
            };
            setSearchedDate({
                startDate,
                endDate,
            });
            setSearchedData(params);
            const response = await getFundsAnalyze(params);
            setAnalyseData(response);
        } catch (error) {
            console.error('Error fetching change tab data:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
    };

    return (
        <div className="relative">
            <S.Background $url={StatisticsBack} />
            <S.Container>
                <h1 className="text-right mb-10 px-10 text-4xl">
                    تغییرات سهامداران درصدی صندوق ها
                </h1>
                <div className="change-container">
                    <div className=" pt-10">
                        <div className="data-filter-inputs justify-center flex items-end flex-wrap gap-y-5">
                            <div className="flex flex-col items-start">
                                <div>نوع صندوق:</div>
                                <S.DropDownStyle
                                    options={fundsList}
                                    value={selectedTicker || ''}
                                    onChange={(e: { value }) => {
                                        setSelectedTicker(e.value);
                                        fundChanged(e);
                                    }}
                                    optionLabel="name"
                                    panelStyle={{
                                        background:
                                            theme === 'dark'
                                                ? 'black'
                                                : 'white',
                                        color: 'red',
                                    }}
                                />
                            </div>
                            <div className="flex flex-col items-start mr-4">
                                <div>نام صندوق:</div>
                                <S.Input
                                    value={autoCompleteValues.lastName || ''}
                                    suggestions={suggestions.lastName}
                                    completeMethod={suggestLastName}
                                    onChange={(e) => {
                                        setAutoCompleteValues({
                                            lastName: e.value || '',
                                        });
                                    }}
                                    placeholder="نام صندوق"
                                />
                            </div>
                            <div className="flex flex-col relative">
                                <div className="flex items-center gap-32 mx-5">
                                    <span>از:</span>
                                    <span>تا:</span>
                                </div>
                                <DatePicker
                                    key={key}
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
                                            convertToPersianDate(
                                                e.to.toISOString()
                                            )
                                        );
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
                                        setKey((prevKey) => prevKey + 1);
                                    }}
                                    className="absolute left-5 top-6 aspect-square h-8 w-8 max-w-8 min-w-0 p-0 justify-center"
                                    text
                                >
                                    <i className="pi pi-times"></i>
                                </Button>
                            </div>
                            <Button
                                label={loadingData ? 'درحال پردازش' : 'جستجو'}
                                icon="pi pi-search ml-2 text-sm"
                                onClick={fetchStatisticsData}
                                className={` rounded-lg ${loadingData ? 'w-fit' : 'w-32'} py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                outlined
                                disabled={loadingData}
                            />
                        </div>
                    </div>

                    {!!searchedDate.startDate && !!searchedDate.endDate && (
                        <div className="w-full text-center text-xl mt-5 flex items-center gap-1 justify-center">
                            از تاریخ <div>{searchedDate.startDate}</div> تا
                            تاریخ <div>{searchedDate.endDate}</div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 my-2 px-3">
                        <Button
                            icon="pi pi-download text-lg"
                            onClick={handleMainPageDownload}
                            className={` rounded-lg py-2 text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            text
                            disabled={loadingDownload}
                        />
                    </div>
                    {loadingData ? (
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
                    ) : (
                        <DataTable
                            showRows
                            data={analyseData}
                            columnFields={changeColumnFields}
                            totalRecords={analyseData.length}
                            pagination
                            scrollHeight={tableHeight + 'px'}
                        />
                    )}
                </div>
                {loadingData ? (
                    <div></div>
                ) : (
                    <div className="chart-container mt-5">
                        <Chart
                            options={{
                                chart: {
                                    type: 'line',
                                    zoom: { enabled: true },
                                    toolbar: {
                                        show: false,
                                        tools: {
                                            download: true,
                                        },
                                    },
                                },
                                xaxis: {
                                    categories: chartDates,
                                },
                                grid: {
                                    borderColor: '#444444',
                                },
                                colors: ['#546E7A', '#FF5733', '#33FFBD'],
                                tooltip: {
                                    theme: theme,
                                    style: {
                                        fontSize: '14px',
                                        fontFamily: 'IranSans',
                                    },
                                    marker: {
                                        show: true,
                                    },
                                },
                                stroke: {
                                    curve: 'straight' as 'straight',
                                },
                                yaxis: {
                                    labels: {
                                        formatter: (value: number) =>
                                            value.toLocaleString('fa-IR'),
                                        style: {
                                            fontSize: '14px',
                                        },
                                    },
                                },
                            }}
                            series={chartSeries}
                            height={500}
                        />
                    </div>
                )}
            </S.Container>
        </div>
    );
};

export default MainContent;
