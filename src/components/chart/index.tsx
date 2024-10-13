import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
}

interface LineChartProps {
    datasets: Dataset[];
    labels: string[];
    selectedWidth?: number | string;
}

const LineChart: React.FC<LineChartProps> = ({
    datasets,
    labels,
    selectedWidth,
}) => {
    const chartRef = useRef<ChartJS<'line'>>(null);
    const [chartSize, setChartSize] = useState({
        width: '100%',
        height: '100%',
    });

    const chartData = {
        labels: labels,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    color: '#ffffff',
                    font: {
                        family: 'IranSans',
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#444444',
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        family: 'IranSans',
                    },
                },
            },
            y: {
                grid: {
                    color: '#444444',
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        family: 'IranSans',
                    },
                },
            },
        },
    };

    return (
        <div
            style={{
                width: `100%`,
                height: `100%`,
            }}
            className="flex justify-center pr-5"
        >
            <div
                style={{ position: 'relative', width: '100%', height: '400px' }}
            >
                <Line ref={chartRef} options={options} data={chartData} />
            </div>
        </div>
    );
};

export default LineChart;
