import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sensor from '../../interfaces/Sensor';
import { getPrivateSensors } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

// Components
import SensorItem from '../../components/dashboard/SensorItem';

const GroupSensors: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSensors(await getPrivateSensors(groupId || ''));
            } catch (error) {
                console.error('Error fetching sensors:', error);
            }
        };

        fetchData();
    }, [groupId]);

    const handleSensorClick = async (sensorId: string) => {
        navigate(`/dashboard/sensors/${sensorId}`);
    };

    return (
        <div id="main-content" data-name={`Sensors for ${groupId}`}>
            {/* <ul>
                {Array.isArray(sensors) && sensors.length > 0 ? (
                    sensors.map((sensor, index) => (
                        <li key={index}>
                            <h3>{sensor.name}</h3>
                            <p>Description: {sensor.description}</p>
                        </li>
                    ))
                ) : (
                    <li>No sensors available for this group</li>
                )}
            </ul> */}
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {Array.isArray(sensors) && sensors.length > 0 ? (
                        sensors.map((sensor, index) => (
                            <SensorItem key={index} sensor={sensor} handleSensorClick={handleSensorClick} />
                        ))
                    ) : (
                        <li>No groups data available</li>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupSensors;
