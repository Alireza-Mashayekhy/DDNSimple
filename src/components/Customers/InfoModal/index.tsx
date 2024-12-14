import { SFC } from '@/types';
import * as S from './Styles';
import { exportCustomerData } from '@/api/customerData';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { useEffect, useState } from 'react';
import LineChart from '@/components/chart';
import { getUserData } from '@/utils/authentication';
import DataTable from '@/components/DataTable';
import { Button } from 'primereact/button';

interface DdnHistoryEntry {
    ticker: string;
    date: string;
    total_count: number;
    wage: number;
    freezed_count: number;
    shares: number;
    commission: number;
}

interface DdnHistoryChartEntry {
    [key: string]: {
        dates: string[];
        total_count: number[];
    };
}

interface ApiData {
    first_name: string;
    last_name: string;
    national_id: string;
    tax_id: string | null;
    stock_id: string;
    brith_date: string;
    shsa_id: string;
    gender: 'M' | 'F';
    inv_type: string;
    ddn_history: DdnHistoryEntry[];
    ddn_history_chart: DdnHistoryChartEntry[];
}

interface CustomerInfoModalProps {
    visible: boolean;
    setVisibleProp: (visible: boolean) => void;
    customer?: ApiData; // customer can be optional
    customerTicker?: string;
}

const InfoModal: SFC<CustomerInfoModalProps> = ({
    visible,
    setVisibleProp,
    customer,
    customerTicker,
}) => {
    const [ddnHistoryChart, setDdnHistoryChart] = useState<{
        labels: string[];
        datasets: { name: string; data: number[]; borderColor: string }[];
    }>({ labels: [], datasets: [] });

    const theme = useSelector(getTheme);

    useEffect(() => {
        setDdnHistoryChart({ labels: [], datasets: [] });
        if (
            customer?.ddn_history_chart &&
            customer?.ddn_history_chart.length > 0
        ) {
            const chartData = customer?.ddn_history_chart[0] as {
                [key: string]: { total_count: number[]; dates: string[] };
            };
            const datasets = Object.entries(chartData)?.map(
                ([ticker, data]) => {
                    return {
                        name: ticker,
                        data: data?.total_count?.reverse(),
                        borderColor: theme === 'dark' ? 'white' : 'black',
                        fill: false,
                        tension: 0.1,
                    };
                }
            );

            const maxDatesDataset = datasets?.reduce((prev, current) =>
                prev.data.length > current.data.length ? prev : current
            );

            setDdnHistoryChart({
                labels: chartData[maxDatesDataset.name].dates.reverse(),
                datasets: datasets,
            });
        }
    }, [customer]);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff6384']; // Add more colors if needed

    const footerContent = (
        <S.FooterContainer>
            <S.FooterButton
                label="بستن"
                onClick={() => setVisibleProp(false)}
                autoFocus
            ></S.FooterButton>
        </S.FooterContainer>
    );
    const userData = getUserData();

    const exportData = () => {
        if (customer) {
            const customerData = {
                id: customer.national_id,
                ticker: customerTicker,
            };
            exportCustomerData(customerData)
                .then((res) => {
                    const blob = res.data;
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute(
                        'download',
                        `گزارش جامع ${userData.first_name || ''} ${userData.last_name || ''} ${customer.first_name || ''} ${customer.last_name || ''}.xlsx`
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    toast('با موفقیت ذخیره شد.');
                })
                .catch((error) => {
                    toast(error.message);
                });
        }
    };

    function numberFormatter(number: number) {
        const isNegative = number < 0;
        const absNumberStr = Math.abs(number).toString();
        const formattedNumber = absNumberStr.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
        );
        return isNegative ? `(${formattedNumber})` : formattedNumber;
    }

    const customerColumnFields = [
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
            field: 'shares',
            header: 'تعداد سهام کل',
            width: '10%',
        },
        {
            field: 'value',
            header: 'ارزش کل (ریال)',
            width: '10%',
        },
        {
            field: 'wage',
            header: 'درصد کارمزد بازاریاب',
            width: '10%',
        },
        {
            field: 'commission',
            header: 'کارمزد بازاریاب',
            width: '10%',
            body: (rowData: DdnHistoryEntry) =>
                numberFormatter(Number(rowData.commission.toFixed(2))),
        },
    ];

    const headerContent = <div className="text-center">جزییات سهامدار</div>;

    return (
        <S.Container
            header={headerContent}
            footer={footerContent}
            visible={visible}
            onHide={() => setVisibleProp(false)}
            style={{ width: '60vw', minWidth: '300px' }}
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
                    <span className="font-bold">کد سهامداری :</span>{' '}
                    {customer?.stock_id}
                </p>
                <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
                    <span className="font-bold">کد ملی :</span>{' '}
                    {customer?.national_id}
                </p>
                <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
                    <span className="font-bold">نوع سرمایه‌گذار: </span>{' '}
                    {customer?.inv_type === 'I' ? 'حقیقی' : 'حقوقی'}
                </p>
            </div>

            <div className="flex justify-end">
                <Button
                    icon="pi pi-download text-2xl"
                    onClick={exportData}
                    className={` rounded-lg aspect-square bg-inherit ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                />
            </div>

            {/* Investment table */}
            <div>
                <DataTable
                    data={customer?.ddn_history}
                    totalRecords={customer?.ddn_history?.length}
                    pagination
                    columnFields={customerColumnFields}
                    scrollHeight={'400px'}
                />
            </div>
            <div className="flex justify-center mt-10">
                <LineChart
                    datasets={ddnHistoryChart.datasets}
                    labels={ddnHistoryChart.labels}
                />
            </div>
        </S.Container>
    );
};

export default InfoModal;
