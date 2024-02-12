import React, { useEffect, useState } from 'react';
import Sensor from '../../../interfaces/Sensor';
import { getSensorData } from '../../../utils/api';
import { SensorData, Reading } from '../../../interfaces/SensorData';
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
import SensorChart from './SensorChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const GenerateSensorDataCharts: React.FC<{ providedSensorData: SensorData[]; }> = ({ providedSensorData }) => {
    const [sensorTimestamps, setSensorTimestamps] = useState<string[]>([]);
    const [sensorReadingss, setSensorReadingss] = useState<Reading[][]>([]);
    const [sensorReadings1, setSensorReadings1] = useState<string[]>([]);
    const [sensorReadings2, setSensorReadings2] = useState<string[]>([]);
    const [sensorReadings3, setSensorReadings3] = useState<string[]>([]);

    const [sensorReadings, setSensorReadings] = useState<Reading[][]>([]);

    const [readingValue, setReadingValue] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = providedSensorData;
                const slicedData = data; //.slice(-100)

                setSensorTimestamps(slicedData.map(data => data?.timestamp));

                const maxReadings = Math.max(...slicedData.map(data => data.readings.length));
                setSensorReadings(
                    Array.from({ length: maxReadings }, (_, index) =>
                        slicedData.map(data => data?.readings[index] ?? "")
                    )
                );

                // setSensorReadings(slicedData.map(data => data?.readings?.map(reading => reading.value)));
                // setSensorReadings(slicedData.map(data => data?.readings.map(reading => reading.value)));
                setSensorReadingss(slicedData.map(data => data?.readings))

                setReadingValue(slicedData[0]?.readings[0]?.type);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [providedSensorData]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : sensorReadings.length > 1 ? (
                <>
                    {/* <SensorChart readings={sensorReadings1} timestamps={sensorTimestamps} />
                    <SensorChart readings={sensorReadings2} timestamps={sensorTimestamps} />
                    <SensorChart readings={sensorReadings3} timestamps={sensorTimestamps} /> */}
                    {sensorReadings.map((readings, index) => (
                        (readings[0].type !== 'voltage' && readings[0].type !== 'battery status') && (
                            <div className="row">

                                <div className='col-3'>
                                    {/* {readings.map((reading) => (
                                        <li key={reading._id}>
                                            <p>Type: {reading.type}</p>
                                            <p>Unit: {reading.unit}</p>
                                            <p>Value: {reading.value}</p>
                                        </li>
                                    ))} */}
                                </div>

                                <div key={index} className='col-9'>
                                    <h3>{`${readings[0].type} chart`}</h3>
                                    <SensorChart readings={readings.map(reading => reading.value)} timestamps={sensorTimestamps} label={readings[0].type} />
                                </div>

                            </div>
                        )
                    ))}
                </>
            ) : (
                <div>
                    <p>Loading graph...</p>
                    <div className="spinner-border" style={{ width: '30rem', height: '30rem' }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}



        </div>
    );
};

export default GenerateSensorDataCharts;