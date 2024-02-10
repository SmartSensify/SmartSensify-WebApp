import React from 'react';
import Sensor from '../../interfaces/Sensor';

const SensorItem: React.FC<{ sensor: Sensor; handleSensorClick: (sensorId: string) => void }> = ({ sensor, handleSensorClick }) => {
    return (
        <div className="transition-bg cursor-pointer group-card p-3 m-3 border rounded bg-body" onClick={() => handleSensorClick(sensor._id)}>
            <span className="noselect material-symbols-outlined d-block text-center">
                nest_remote_comfort_sensor
            </span>
            <h4 className="text-center mt-2 mb-1">{sensor?.name}</h4>
            <p className="text-center mb-1">ID: {sensor?._id}</p>
            <p className="text-center">Types: {sensor?.type?.join(', ')}</p>
        </div>
    );
};

export default SensorItem;