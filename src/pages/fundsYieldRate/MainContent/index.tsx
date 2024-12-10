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
import {
    exportFundnav,
    getFundsData,
    getNames,
    getTypes,
} from '@/api/fundsYieldRate';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { exportCustomerData } from '@/api/customerData';
import { numberFormatter } from '@/utils/numberFormatter';

const MainContent: SFC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [analyseData, setAnalyseData] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState({
        name: 'همه',
        code: '',
    });
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [loadingData, setLoading] = useState(false);
    const [autoCompleteValues, setAutoCompleteValues] = useState('');
    const [suggestions, setSuggestions] = useState<any>({ lastName: [] });
    const [summaryData, setSummaryData] = useState([]);
    const [loadingDownload, setLoadingDownload] = useState(false);

    const [key, setKey] = useState<number>(0);
    const [fundsList, setFundsList] = useState([]);
    const theme = useSelector(getTheme);

    const changeColumnFields = [
        {
            field: 'fundnav_type',
            header: 'نوع صندوق',
            width: '10%',
            sortable: true,
        },
        {
            field: 'name',
            header: 'نام صندوق',
            width: '10%',
            sortable: true,
        },
        {
            field: 'two_weeks',
            header: 'بازده دوهفته',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.two_weeks < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.two_weeks.toFixed(2)))}
                    </div>
                );
            },
            sortable: true,
        },
        {
            field: 'month',
            header: 'بازده ماهانه',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.month < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.month.toFixed(2)))}
                    </div>
                );
            },
            sortable: true,
        },
        {
            field: 'three_months',
            header: 'بازده سه ماهه',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.three_months < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.three_months.toFixed(2)))}
                    </div>
                );
            },
        },
        {
            field: 'six_months',
            header: 'بازده شش ماهه',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.six_months < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.six_months.toFixed(2)))}
                    </div>
                );
            },
            sortable: true,
        },
        {
            field: 'year',
            header: 'بازده سالانه',
            width: '10%',
            body: (data) => {
                return (
                    <div style={{ color: data.year < 0 ? 'red' : '' }}>
                        {numberFormatter(Number(data.year.toFixed(2)))}
                    </div>
                );
            },
            sortable: true,
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

        if (!startDate) {
            setLoading(false);
            return;
        }
        try {
            const params: { [key: string]: string } = {
                date: startDate,
            };
            if (autoCompleteValues) {
                params.name = autoCompleteValues;
            }
            if (selectedTicker.code) {
                params.fundnav_type = selectedTicker.code;
            }
            const response = await getFundsData(params);
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

    const handleMainPageDownload = async () => {
        if (startDate) {
            setLoadingDownload(true);
            const customerData = {
                date: startDate,
                name: autoCompleteValues,
                fundnav_type: selectedTicker.code,
                export: true,
            };
            exportFundnav(customerData)
                .then((res) => {
                    const blob = res.data;
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute(
                        'download',
                        `نرخ بازدهی صندوق در تاریخ ${startDate}}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    toast('با موفقیت ذخیره شد.');
                    setLoadingDownload(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingDownload(false);
                });
        }
    };

    return (
        <div className="relative">
            <S.Background $url={StatisticsBack} />
            <S.Container>
                <h1 className="text-right mb-10 px-10 text-4xl">
                    نرخ بازدهی صندوق ها
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
                                    <span>تاریخ:</span>
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
                                                e.value.toISOString()
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
                    />
                </div>
            </S.Container>
        </div>
    );
};

export default MainContent;
