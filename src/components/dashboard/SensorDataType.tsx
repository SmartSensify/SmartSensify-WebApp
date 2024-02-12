import React, { useEffect, useState } from 'react';
import Sensor from '../../interfaces/Sensor';
import { getSensorData } from '../../utils/api';
import { SensorData, Reading } from '../../interfaces/SensorData';
import GenerateSensorDataCharts from './charts/GenerateSensorDataCharts';

const SensorDataItem: React.FC<{ sensor: Sensor; }> = ({ sensor }) => {
    const [mainSensorData, setMainSensorData] = useState<SensorData[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMainSensorData(await getSensorData(sensor._id, startDate, endDate));
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
    }, [sensor, startDate, endDate]);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    return (
        <div>
            <div>
                <h3>Data charts</h3>

                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="datepicker-startDate" className="form-label">Date from:</label>
                        <input id="datepicker-startDate" type="date" className="form-control" onChange={handleStartDateChange} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="datepicker-endDate" className="form-label">Date to:</label>
                        <input id="datepicker-endDate" type="date" className="form-control" onChange={handleEndDateChange} />
                    </div>
                </div>

                {<GenerateSensorDataCharts providedSensorData={mainSensorData} />}
            </div>
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