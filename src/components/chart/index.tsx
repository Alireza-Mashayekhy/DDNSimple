import { getTheme } from '@/redux/selectors';
import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

interface Dataset {
    name: string;
    data: number[];
    color?: string;
}

interface LineChartProps {
    datasets: Dataset[];
    labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ datasets, labels }) => {
    const theme = useSelector(getTheme);
    const chartOptions = {
        chart: {
            type: 'line' as 'line',
            height: 400,
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: true,
                tools: {
                    download: false,
                },
            },
        },
        colors: datasets.map((dataset) => dataset.color || '#00E396'), // اختصاص رنگ‌ها به داده‌ها
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    colors: theme === 'dark' ? '#ffffff' : '#000000',
                    fontFamily: 'IranSans',
                },
            },
            axisBorder: {
                color: '#444444',
            },
            axisTicks: {
                color: '#444444',
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    return value.toLocaleString('fa-IR');
                },
                style: {
                    colors: theme === 'dark' ? '#ffffff' : '#000000',
                    fontFamily: 'IranSans',
                },
            },
        },
        grid: {
            borderColor: '#444444',
        },
        legend: {
            show: false,
        },
        stroke: {
            curve: 'straight' as 'straight', // اصلاح مقدار تایپ شده
        },
        tooltip: {
            theme: theme,
            style: {
                fontSize: '14px',
                fontFamily: 'IranSans',
                colors: ['#f0f0f0'], // رنگ متون داخل tooltip
            },
            marker: {
                show: true,
            },
        },
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            className="flex justify-center pr-5"
        >
            <div
                style={{ position: 'relative', width: '100%', height: '400px' }}
            >
                <Chart options={chartOptions} series={datasets} type="line" />
            </div>
        </div>
    );
};

export default LineChart;
