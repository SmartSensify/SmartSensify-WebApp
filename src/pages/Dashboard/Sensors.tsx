import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCertainSensor, getPrivateSensors, getSensorData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

// Interfaces
import Sensor from '../../interfaces/Sensor';
import SensorDataType from '../../components/dashboard/SensorDataType';
import GenerateBatteryChart from '../../components/dashboard/charts/GenerateBatteryChart';
import { SensorData } from '../../interfaces/SensorData';

const Sensors: React.FC = () => {
    const { sensorId } = useParams<{ sensorId: string }>();
    const [sensor, setSensor] = useState<Sensor | undefined>();
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSensor = await getCertainSensor(sensorId || '');
                setSensor(fetchedSensor);
                
            } catch (error) {
                console.error('Error fetching sensors:', error);
            }
        };

        fetchData();
    }, [sensorId]);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                if (sensor) {
                    const data = await getSensorData(sensor._id);
                    setSensorData(data);
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData();
    }, [sensor]);

    const handleSensorClick = async (sensorId: string) => {
        navigate(`/dashboard/sensors/${sensorId}`);
    };

    return (
        <div id="main-content" data-name={`Sensor: ${sensorId}`}>
            <div className="row">
                <div className="col bg-body-secondary rounded m-4 p-4">
                    <h5>Sensor: {sensor?.name}</h5>
                    <h5>Sensor Id: {sensor?._id}</h5>
                    <h5>Sensor secret key: {sensor?.secretKey}</h5>
                    <h6 className={sensor?.isActive ? 'text-success' : 'text-danger'}>
                        {sensor?.isActive ? "Active" : "Inactive"}
                    </h6>
                    <h6>
                        {sensor?.isPublic ? "Public" : "Private"}
                    </h6>
                </div>
                <div className="col bg-body-secondary rounded m-4 p-4">
                    <h4>Battery</h4>
                    <div>
                        <GenerateBatteryChart providedSensorData={sensorData} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col bg-body-secondary rounded m-4 p-4 container">
                    <h4>Managing</h4>
                    <div className="row">
                        <button className='btn btn-primary w-50 mt-4'>Settings</button>
                        <button className='btn btn-primary w-50 mt-4'>Alerts</button>
                    </div>
                    <div className="row">
                        <button className='btn btn-primary w-50 mt-4'>Logs</button>
                        <button className='btn btn-primary w-50 mt-4'>Error</button>
                    </div>
                </div>
                <div className="col bg-body-secondary rounded m-4 p-4 container">
                    <div className="row">
                        <div className='w-50'>
                            <h4>Current localization</h4>
                            <div>Lozalization map</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col bg-body-secondary rounded m-4 p-4 container">
                    <SensorDataType sensor={sensor!} />
                </div>
            </div>
        </div>
    );
};

export default Sensors;
