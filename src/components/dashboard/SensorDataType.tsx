import React, { useEffect, useState } from 'react';
import Sensor from '../../interfaces/Sensor';
import { getSensorData } from '../../utils/api';
import { SensorData, Reading } from '../../interfaces/SensorData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line, Chart } from 'react-chartjs-2'
import SensorChart from './charts/SensorChart';
import GenerateSensorDataCharts from './charts/GenerateSensorDataCharts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SensorDataItem: React.FC<{ sensor: Sensor; }> = ({ sensor }) => {
    const [mainSensorData, setMainSensorata] = useState<SensorData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMainSensorata(await getSensorData(sensor._id));
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
    }, [sensor]);

    return (
        <div>
            <div>
                {<GenerateSensorDataCharts providedSensorData={mainSensorData} />}
            </div>
            <h3>Sensor Data Display</h3>
            {/* {sensorData.map((data) => (
                <div key={data._id}>
                    <h2>Location: {data.location.x}, {data.location.y}</h2>
                    <p>Sensor ID: {data.sensorId}</p>
                    <p>Timestamp: {data.timestamp}</p>
                    <h3>Readings:</h3>
                    <ul>
                        {data.readings.map((reading) => (
                            <li key={reading._id}>
                                <p>Type: {reading.type}</p>
                                <p>Unit: {reading.unit}</p>
                                <p>Value: {reading.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))} */}
        </div>
    );
};

export default SensorDataItem;