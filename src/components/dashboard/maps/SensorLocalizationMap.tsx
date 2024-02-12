import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Sensor from '../../../interfaces/Sensor';
import MyMap from './MyMap';

interface SensorLocalizationMapProps {
    sensor: Sensor;
}

const SensorLocalizationMap: React.FC<SensorLocalizationMapProps> = ({ sensor }) => {
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [longitude, setLongitude] = useState<number | undefined>(undefined);

    useEffect(() => {
        setLatitude(sensor?.defaultLocation?.[0]?.latitude);
        setLongitude(sensor?.defaultLocation?.[0]?.longitude);
    }, [sensor]);

    const position: [number, number] = [latitude || 0, longitude || 0];

    return (
        <div>
            <h6>Localization Map</h6>
            <MyMap latitude={latitude} longitude={longitude} sensorName={sensor?.name} />
        </div>
    );
};

export default SensorLocalizationMap;
