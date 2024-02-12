import React, { useEffect, useState } from 'react';
import Sensor from '../../../interfaces/Sensor';
import { getSensorData } from '../../../utils/api';
import { SensorData, Reading } from '../../../interfaces/SensorData';
import SensorChart from './SensorChart';

const GenerateBatteryChart: React.FC<{ providedSensorData: SensorData[]; }> = ({ providedSensorData }) => {
    const [sensorTimestamps, setSensorTimestamps] = useState<string[]>([]);
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
                console.log(`Sensor readings battery: ${sensorReadings}`);
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
                    {sensorReadings.map((readings, index) => (
                        (readings.find(reading => reading?.type)?.type == 'battery status') && (
                            <div key={index}>
                                <SensorChart readings={readings.map(reading => reading.value)} timestamps={sensorTimestamps} label={readings.find(reading => reading?.type)?.type!} />
                            </div>
                        )
                    ))}
                </>
            ) : (
                <div>
                    <p>Loading battery graph...</p>
                    <div className="spinner-border" style={{ width: '10rem', height: '10rem' }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateBatteryChart;