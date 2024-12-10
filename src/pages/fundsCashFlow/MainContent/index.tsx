import { AppDispatch, SFC } from '@/types';
import * as S from './Styles';
import { Button } from 'primereact/button';
import { DatePicker } from 'zaman';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '@/components/DataTable';
import { getTheme } from '@/redux/selectors';
import moment from 'moment-jalaali';
import StatisticsBack from '@/assets/statisticsBack.jpg';
import { getFundNames, getFundsAnalyze, getFundTypes } from '@/api/investment';
import {
    exportCashflow,
    exportCashflowDetail,
    getCashflow,
    getCashflowDetail,
    getNames,
    getTypes,
} from '@/api/fundsYieldRate';
import { useDispatch } from 'react-redux';
import LineChart from '@/components/chart';
import { toast } from 'react-toastify';
import { numberFormatter } from '@/utils/numberFormatter';

const MainContent: SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [analyseData, setAnalyseData] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState({
        name: 'همه',
        code: '',
    });
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [loadingData, setLoading] = useState(false);
    const [autoCompleteValues, setAutoCompleteValues] = useState('');
    const [suggestions, setSuggestions] = useState<any>({ lastName: [] });
    const [summaryData, setSummaryData] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [key, setKey] = useState<number>(0);
    const [fundsList, setFundsList] = useState([]);
    const [detail, setDetail] = useState({
        name: '',
        detail: [],
    });
    const [searchedParams, setSearchedParams] = useState<{
        [key: string]: string;
    }>({
        start_date: '',
        end_date: '',
        name: '',
    });
    const [ddnHistoryChart, setDdnHistoryChart] = useState<{
        labels: string[];
        datasets: { name: string; data: number[]; borderColor: string }[];
    }>({ labels: [], datasets: [] });
    const [loadingDownload, setLoadingDownload] = useState(false);

    const theme = useSelector(getTheme);

    const detailDialogStyle = {
        width: '60vw',
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

    const changeColumnFields = [
        {
            field: 'name',
            header: 'نام صندوق',
            width: '10%',
        },
        {
            field: 'total_cash_flow',
            header: 'جریان نقدی(میلیارد ریال)',
            width: '10%',
            body: (data) => {
                return (
                    <div
                        style={{ color: data.total_cash_flow < 0 ? 'red' : '' }}
                    >
                        {numberFormatter(
                            Number(
                                (data.total_cash_flow / 1000000000).toFixed(2)
                            )
                        )}
                    </div>
                );
            },
        },
        {
            field: 'details',
            header: 'جزئیات',
            width: '10%',
        },
    ];

    const DetailColumnFields = [
        {
            field: 'date',
            header: 'تاریخ',
            width: '10%',
        },
        {
            field: 'cash_flow',
            header: 'جریان نقدی(میلیارد ریال)',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.cash_flow < 0 ? 'red' : '' }}>
                        {numberFormatter(
                            Number((data.cash_flow / 1000000000).toFixed(2))
                        )}
                    </div>
                );
            },
        },
        {
            field: 'size',
            header: 'ارزش صندوق',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.size < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.size.toFixed(2)))}
                    </div>
                );
            },
        },
        {
            field: 'ratio',
            header: 'نسبت جریان نقدی به ارزش صندوق',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.ratio < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.ratio.toFixed(2)))}
                    </div>
                );
            },
        },
    ];

    const getFundTypesList = async () => {
        const res = await getTypes(dispatch);
        res.forEach((element) => {
            element.code = element.pk;
        });
        res.push({ name: 'همه', code: '' });
        const result = res.map(({ id, ...rest }) => rest);
        setFundsList(result);
        const res2 = await getNames(dispatch, {});
        setSummaryData(res2);
    };

    useEffect(() => {
        getFundTypesList();
    }, []);

    const suggestLastName = (event: any) => {
        const query = event.query.toLowerCase();
        const filteredSuggestions = summaryData
            .map((item: any) => item.name)
            .filter((name: any) => name.toLowerCase().includes(query));
        setSuggestions({ ...suggestions, lastName: filteredSuggestions });
    };

    const fundChanged = async (e) => {
        if (e.value.code) {
            const res = await getNames(dispatch, {
                fundnav_type: e.value.code,
            });
            setSummaryData(res);
        } else {
            const res = await getNames(dispatch, {});
            setSummaryData(res);
        }
    };

    const [tableHeight, setTableHeight] = useState(window.innerHeight - 450);
    useEffect(() => {
        window.addEventListener('resize', () =>
            setTableHeight(window.innerHeight - 450)
        );
    }, []);

    const fetchStatisticsData = async () => {
        setLoading(true);

        if (!startDate || !endDate) {
            setLoading(false);
            return;
        }
        try {
            const params: { [key: string]: string } = {
                start_date: startDate,
                end_date: endDate,
            };
            if (autoCompleteValues) {
                params.name = autoCompleteValues;
            }
            if (selectedTicker.code) {
                params.fundnav_type = selectedTicker.code;
            }
            setSearchedParams(params);
            const response = await getCashflow(params);
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

    const handleDetailsClick = async (detail) => {
        const params = {
            start_date: searchedParams.start_date,
            end_date: searchedParams.end_date,
            name: detail.name,
        };
        const response = await getCashflowDetail(params);

        if (
            response?.chart_data?.cash_flows &&
            response?.chart_data?.cash_flows.length > 0
        ) {
            const datasets = [
                {
                    name: 'Cash Flows',
                    data: response.chart_data.cash_flows,
                    borderColor: theme === 'dark' ? 'white' : 'black',
                    fill: false,
                    tension: 0.1,
                },
            ];
            setDdnHistoryChart({
                labels: response.chart_data.dates,
                datasets: datasets,
            });
        }
        setDetail(response);
        setDetailModal(true);
    };

    const handleMainPageDownload = async () => {
        if (startDate && endDate) {
            setLoadingDownload(true);
            const params: { [key: string]: string } = {
                start_date: startDate,
                end_date: endDate,
            };
            if (autoCompleteValues) {
                params.name = autoCompleteValues;
            }
            if (selectedTicker.code) {
                params.fundnav_type = selectedTicker.code;
            }
            exportCashflow(params)
                .then((res) => {
                    const blob = res.data;
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute(
                        'download',
                        `جریان نقدی صندوق از ${startDate} تا ${endDate}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    toast.success('با موفقیت ذخیره شد.');
                    setLoadingDownload(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingDownload(false);
                });
        }
    };

    const exportData = () => {
        const customerData = {
            start_date: searchedParams.start_date,
            end_date: searchedParams.end_date,
            name: detail.name,
        };
        exportCashflowDetail(customerData)
            .then((res) => {
                const blob = res.data;
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute(
                    'download',
                    `جریان نقدی صندوق ${detail.name} از ${startDate} تا ${endDate}.xlsx`
                );
                document.body.appendChild(link);
                link.click();
                link.remove();
                toast('با موفقیت ذخیره شد.');
            })
            .catch((error) => {
                toast(error.message);
            });
    };

    return (
        <div className="relative">
            <S.Background $url={StatisticsBack} />
            <S.Container>
                <h1 className="text-right mb-10 px-10 text-4xl">
                    جریان نقدی صندوق ها
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
                                    value={autoCompleteValues || ''}
                                    suggestions={suggestions.lastName}
                                    completeMethod={suggestLastName}
                                    onChange={(e) => {
                                        setAutoCompleteValues(e.value || '');
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
                                    range
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
                        </div>
                        <div className="flex justify-center my-5 gap-2">
                            <Button
                                label={loadingData ? 'درحال پردازش' : 'جستجو'}
                                icon="pi pi-search ml-2 text-sm"
                                onClick={fetchStatisticsData}
                                className={` rounded-lg ${loadingData ? 'w-fit' : 'w-32'} py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                outlined
                                disabled={loadingData}
                            />
                            <Button
                                label={
                                    loadingDownload ? 'در حال پردازش' : 'دانلود'
                                }
                                icon="pi pi-download ml-2 text-sm"
                                onClick={handleMainPageDownload}
                                className={` rounded-lg ${loadingDownload ? 'w-auto' : 'w-28'} py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                outlined
                                disabled={loadingDownload}
                            />
                        </div>
                    </div>
                    <DataTable
                        showRows
                        data={analyseData}
                        columnFields={changeColumnFields}
                        totalRecords={analyseData.length}
                        pagination
                        scrollHeight={tableHeight + 'px'}
                        onDetailsClick={handleDetailsClick}
                    />
                    <S.DialogStyle
                        header={detail.name}
                        visible={detailModal}
                        style={detailDialogStyle}
                        headerStyle={headerStyle}
                        contentStyle={contentStyle}
                        onHide={() => setDetailModal(false)}
                        dismissableMask
                        draggable={false}
                        resizable={false}
                    >
                        <div className="flex justify-end">
                            <Button
                                icon="pi pi-download text-2xl"
                                onClick={exportData}
                                className={` rounded-lg aspect-square bg-inherit ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            />
                        </div>
                        <DataTable
                            data={detail.detail}
                            columnFields={DetailColumnFields}
                        />
                        <div className="flex justify-center mt-10">
                            <LineChart
                                datasets={ddnHistoryChart.datasets}
                                labels={ddnHistoryChart.labels}
                            />
                        </div>
                    </S.DialogStyle>
                </div>
            </S.Container>
        </div>
    );
};

export default MainContent;
