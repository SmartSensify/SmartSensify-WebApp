import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    latitude?: number;
    longitude?: number;
    sensorName?: string;
}

const MyMap: React.FC<MapProps> = ({ latitude, longitude, sensorName }) => {
    const position: [number, number] | undefined =
        latitude !== undefined && longitude !== undefined ? [latitude, longitude] : undefined;

    return (
        <div>
            {position && (
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: '200px', width: '200%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>{sensorName || 'Sensor'}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default MyMap;