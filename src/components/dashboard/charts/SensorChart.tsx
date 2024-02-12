import React, { useEffect, useState } from 'react';
import Sensor from '../../../interfaces/Sensor';
import { getSensorData } from '../../../utils/api';
import { SensorData, Reading } from '../../../interfaces/SensorData';
import 'chartjs-adapter-moment';
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

    const formattedTimestamps = timestamps.map(timestamp => moment(timestamp).format('YY MMM D HH:m'));

    const data: ChartData<'line'> = {
        labels: formattedTimestamps,
        datasets: [
            {
                label: label,
                data: readings.map(value => parseFloat(value)),
                fill: false,
                borderColor: '#238c51',
                tension: .3,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                // type: 'time',
                time: {
                    unit: 'hour', // or 'month', depending on your data range
                    displayFormats: {
                        day: 'MMM D, YYYY',
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

    return <Line data={data} options={options} />;
};

export default SensorChart;