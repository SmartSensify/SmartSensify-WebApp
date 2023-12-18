import axios, { AxiosResponse } from 'axios';
import {
    setAuthToken,
    getAuthToken,
    getLoggedUsername,
    removeAuthToken,
    isAuthenticated,
} from './auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = async (credentials: { identifier: string; password: string }): Promise<AxiosResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
        const token = response.data.token;
        setAuthToken(token, credentials.identifier);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getLoggedUserData = async (): Promise<AxiosResponse> => {
    try {
        if (!isAuthenticated()) {
            console.error('User not authenticated');
            throw new Error('User not authenticated');
        }

        const response = await axios.get(`${BASE_URL}/users/${getLoggedUsername()}`, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

interface Sensor {
    id: string;
    value: number;
  }
  
  export const getPublicSensors = async (): Promise<Sensor[]> => {
    try {
      const response = await axios.get<{ sensors: Sensor[] }>('https://smartsensify.onrender.com/api/sensors');
      return response.data.sensors;
    } catch (error) {
      console.error('Error fetching public sensor data:', error);
      throw error; 
    }
  };