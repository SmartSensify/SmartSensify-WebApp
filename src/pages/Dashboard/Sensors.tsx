import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sensor from '../../interfaces/Sensor';
import { getPrivateSensors } from '../../utils/api';

const GroupSensors: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [sensors, setSensors] = useState<Sensor[]>([]);

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

    return (
        <div id="main-content" data-name="Sensors">
            <h1>Sensors for Group {groupId}</h1>
            <ul>
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
            </ul>
        </div>
    );
};

export default GroupSensors;
