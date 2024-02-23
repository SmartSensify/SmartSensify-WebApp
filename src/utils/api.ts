import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    setAuthToken,
    getAuthToken,
    getLoggedUsername,
    removeAuthToken,
    isAuthenticated,
    checkAuthentication,
} from './auth';
import Sensor from '../interfaces/Sensor';
import Group from '../interfaces/Group';
import { SensorData } from '../interfaces/SensorData';
import { showAlert } from './user_interaction/alertController';
import { cacheAllGroups, cacheGroupById } from './server/cacheGroups';
import { cacheAllSensors, cacheSensorById } from './server/cacheSensors';
import { createNewGroup1 } from './server/serverRequests';
import { removeCache } from './server/removeCache';

const BASE_URL = process.env.REACT_APP_BASE_URL;

/* User functions */

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

/* Groups GET */

export const getGroupById = async (groupId: string, useCache: boolean = true): Promise<Group | undefined> => {
    if (!checkAuthentication()) return undefined;
    return cacheGroupById(groupId, useCache);
};

export const getAllGroups = async (useCache: boolean = true): Promise<Group[] | undefined> => {
    if (!checkAuthentication()) return undefined;
    return cacheAllGroups(useCache);
};

/* Sensors GET */

export const getSensorById = async (sensorId: String): Promise<Sensor | undefined> => {
    if (!checkAuthentication()) return undefined;
    return cacheSensorById(sensorId);
}

export const getAllSensorsByGroup = async (groupId: String): Promise<Sensor[] | undefined> => {
    if (!checkAuthentication()) return undefined;
    return cacheAllSensors(groupId);
};

// TODO: Function for refactorization
export const getPublicSensors = async (): Promise<Sensor[]> => {
    try {
        const response = await axios.get<{ sensors: Sensor[] }>(`${BASE_URL}/sensors`);
        return response.data.sensors;
    } catch (error) {
        console.error('Error fetching public sensor data:', error);
        throw error;
    }
};

/* POST, PATCH, DELETE related functions */

const apiRequest = async <T>(
    method: string,
    url: string,
    data: object,
    callback: () => void,
    requestId: string = ''
): Promise<T | undefined> => {
    if (!checkAuthentication()) return undefined;
    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        };

        const response = await axios(config);

        showAlert({
            Header: 'Success',
            Message: `${(data as Group).name || ''} ${getSuccessMessage(method)}`,
            Type: 'success',
        });

        callback();
        if (requestId) removeCache(requestId);

        return response.data;
    } catch (error) {
        showAlert({
            Header: 'Error',
            Message: `Server can't process request.`,
            Type: 'danger',
        });
        return null as any;
    }
};

const getSuccessMessage = (method: string): string => {
    switch (method) {
        case 'post':
            return 'added.';
        case 'delete':
            return 'deleted.';
        case 'patch':
            return 'edited.';
        default:
            return '';
    }
};

/* Groups POST, PATCH, DELETE */

export const createNewGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
    const response = apiRequest<Group>('post', `${BASE_URL}/groups`, { name: group.name, description: group.description }, callback);
    return response;
};

export const deleteGroup = async (groupId: string, callback: () => void): Promise<Group | undefined> => {
    const response = apiRequest<Group>('delete', `${BASE_URL}/groups/${groupId}`, {}, callback);
    return response;
};

export const editExistingGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
    const response = apiRequest<Group>('patch', `${BASE_URL}/groups/${group._id}`, { name: group.name, description: group.description }, callback);
    return response
};

/* Sensors POST, PATCH, DELETE */

export const createNewSensor = async (sensor: Sensor, groupId: string , callback: () => void): Promise<Sensor | undefined> => {
    const response = apiRequest<Sensor>('post', `${BASE_URL}/sensors`, { name: sensor.name, isPublic: sensor.isPublic, groupId: groupId }, callback);
    return response;
}

export const editSensor = async (sensor: Sensor, callback: () => void): Promise<Sensor | undefined> => {
    const response = apiRequest<Sensor>('patch', `${BASE_URL}/sensors/${sensor._id}`, { name: sensor.name, isPublic: sensor.isPublic }, callback);
    return response;
}

export const deleteSensor = async (sensor: Sensor , callback: () => void): Promise<Sensor | undefined> => {
    const response = apiRequest<Sensor>('post', `${BASE_URL}/sensors${sensor._id}`, { }, callback);
    return response;
}

/* Sensor data functions */

export const getSensorData = async (
    sensorId: string,
    startDate?: string | null,
    endDate?: string | null
): Promise<SensorData[]> => {
    if (!isAuthenticated()) throw new Error('User not authenticated');

    try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const response = await axios.get<{ sensorData: SensorData[] }>(
            `${BASE_URL}/sensors/${sensorId}/data?${params.toString()}`,
            {
                headers: {
                    Authorization: `${getAuthToken()}`,
                },
            }
        );

        return response.data as unknown as SensorData[];
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        throw error;
    }
};
