import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Sensor {
  _id: string; 
  value: number;
}

const SensorData: React.FC = () => {
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ sensors: Sensor[] }>('https://smartsensify.onrender.com/api/sensors');
        setSensorData(response.data.sensors);
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
              Sensor ID: {sensor._id}, Value: {sensor.value}
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
