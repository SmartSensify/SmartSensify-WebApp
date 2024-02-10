import React from 'react';
import Sensor from '../../interfaces/Sensor';

const SensorDataItem: React.FC<{ sensor: Sensor; }> = ({ sensor }) => {
    return (
        <div className="">
            <p className="text-center">Types: {sensor?.type?.join(', ')}</p>
        </div>
    );
};

export default SensorDataItem;