import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getAuthToken } from '../auth';
import Sensor from '../../interfaces/Sensor';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axios = Axios.create();
// const instance = Axios.create();
// const axios = setupCache(instance);

/* GET requests */

export const cacheSensorById = async (sensorId: String): Promise<Sensor | undefined> => {
    try {
        const response = await axios.get<{ sensor: Sensor }>(`${BASE_URL}/sensors/${sensorId}`, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        });
        return response.data.sensor;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        throw error;
    }
}

export const cacheAllSensors = async (groupId: String): Promise<Sensor[] | undefined> => {
    try {
        const response = await axios.get<{ sensors: Sensor[] }>(`${BASE_URL}/groups/${groupId}/sensors`, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        });
        return response.data.sensors;
    } catch (error) {
        console.error('Error fetching private groups data:', error);
        throw error;
    }
};