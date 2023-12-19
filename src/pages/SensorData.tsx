import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from '../interfaces/Sensor';
import { getPublicSensors } from '../utils/api';

const SensorData: React.FC = () => {
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSensorData(await getPublicSensors());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sensor Data</h1>
      <ul>
        {Array.isArray(sensorData) && sensorData.length > 0 ? (
          sensorData.map((sensor, index) => (
            <li key={index}>
              <h3>{sensor.name}</h3>
              <h5>Sensor ID: {sensor._id}</h5>
              <p>{sensor.description}</p>
            </li>
          ))
        ) : (
          <li>No sensor data available</li>
        )}
      </ul>
    </div>
  );
}

export default SensorData;
