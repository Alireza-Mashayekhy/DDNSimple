import { SFC } from '@/types';
import * as S from './Styles';
import { exportCustomerData } from '@/api/customerData';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { useEffect, useState } from 'react';
import LineChart from '@/components/chart';
import { getUserData } from '@/utils/authentication';

interface DdnHistoryEntry {
    ticker: string;
    date: string;
    total_count: number;
    wage: number;
    freezed_count: number;
    shares: number;
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

    return (
        <S.Container
            header={'جزییات سهامدار'}
            footer={footerContent}
            visible={visible}
            onHide={() => setVisibleProp(false)}
            style={{ width: '60vw', minWidth: '300px' }}
        >
            {/* Header section */}
            <S.TitleContainer>
                <S.Title>مشخصات:</S.Title>
                <S.DLButton onClick={exportData}>دانلود گزارش</S.DLButton>
            </S.TitleContainer>

            {/* Customer info display */}
            <S.InfoContainer>
                <S.Info>
                    <S.InfoHeader>نام و نام خانوادگی:</S.InfoHeader>
                    {customer?.first_name} {customer?.last_name}
                </S.Info>
                <S.Info>
                    <S.InfoHeader>کد ملی:</S.InfoHeader>
                    {customer?.national_id}
                </S.Info>
                <S.Info>
                    <S.InfoHeader>شماره سهامداری:</S.InfoHeader>
                    {customer?.stock_id}
                </S.Info>
                <S.Info>
                    <S.InfoHeader>تاریخ تولد:</S.InfoHeader>
                    {customer?.brith_date}
                </S.Info>
                <S.Info>
                    <S.InfoHeader>جنسیت:</S.InfoHeader>
                    {customer?.gender === 'M' ? 'مرد' : 'زن'}
                </S.Info>
                <S.Info>
                    <S.InfoHeader>نوع سرمایه‌گذار:</S.InfoHeader>
                    {customer?.inv_type === 'I' ? 'حقیقی' : 'حقوقی'}
                </S.Info>
            </S.InfoContainer>

            {/* Investment table */}
            <S.Title>جدول سرمایه‌گذاری</S.Title>
            <S.TableContainer
                value={customer?.ddn_history}
                tableStyle={{ minWidth: '30rem' }}
                emptyMessage={'داده ای برای نمایش وجود ندارد'}
            >
                <S.TableColumn
                    align={'center'}
                    field="ticker"
                    header="نماد"
                ></S.TableColumn>
                <S.TableColumn
                    align={'center'}
                    field="date"
                    header="تاریخ گزارش"
                ></S.TableColumn>
                <S.TableColumn
                    align={'center'}
                    field="shares"
                    header="سهام کل"
                    body={(rowData: DdnHistoryEntry) =>
                        numberFormatter(Number(rowData.shares.toFixed(2)))
                    }
                ></S.TableColumn>
                <S.TableColumn
                    align={'center'}
                    field="wage"
                    header="کارمزد بازاریاب"
                    body={(rowData: DdnHistoryEntry) => Number(rowData.wage)}
                ></S.TableColumn>
            </S.TableContainer>

            {/* Chart section */}
            <S.Title>نمودار سرمایه‌گذاری</S.Title>
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
