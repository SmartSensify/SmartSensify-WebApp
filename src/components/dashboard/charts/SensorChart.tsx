import React, { useEffect, useState } from 'react';
import Sensor from '../../../interfaces/Sensor';
import { getSensorData } from '../../../utils/api';
import { SensorData, Reading } from '../../../interfaces/SensorData';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartDataset,
    ChartOptions,
    TimeScale,
} from 'chart.js'
import { Line, Chart } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
)

interface SensorChartProps {
    readings: string[];
    timestamps: string[];
    label: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ readings, timestamps, label }) => {

    const formattedTimestamps = timestamps.map(timestamp => moment(timestamp).format('MMM D, YYYY HH'));

    const data: ChartData<'line'> = {
        labels: formattedTimestamps,
        datasets: [
            {
                label: label,
                data: readings.map(value => parseFloat(value)),
                fill: false,
                borderColor: '#238c51',
                tension: 0.1,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'MMM D, YYYY HH',
                    },
                },
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };

    return <Line data={data}  />;
};

export default SensorChart;