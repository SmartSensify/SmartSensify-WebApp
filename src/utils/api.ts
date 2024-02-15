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

export const getPublicSensors = async (): Promise<Sensor[]> => {
    try {
        const response = await axios.get<{ sensors: Sensor[] }>(`${BASE_URL}/sensors`);
        return response.data.sensors;
    } catch (error) {
        console.error('Error fetching public sensor data:', error);
        throw error;
    }
};

/* Groups GET*/

export const getPrivateGroups = async (): Promise<Group[] | undefined> => {
    if (!checkAuthentication()) return undefined;
    try {
        const response = await axios.get<{ groups: Group[] }>(`${BASE_URL}/groups`, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        });
        return response.data.groups;
    } catch (error) {
        console.error('Error fetching private groups data:', error);
        throw error;
    }
};

export const getGroupById = async (groupId: string): Promise<Group | undefined> => {
    if (!checkAuthentication()) return undefined;
    try {
        const response = await axios.get<{ group: Group }>(`${BASE_URL}/groups/${groupId}`, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        });
        return response.data.group;
    } catch (error) {
        console.error('Error fetching private groups data:', error);
        throw error;
    }
};

/* Groups POST, PATCH, DELETE */ 

// Deprecated code

// export const createNewGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
//     if (!checkAuthentication()) return undefined;
//     try {
//        const response = await axios.post<Group>(`${BASE_URL}/groups`, {
//             name: group.name,
//             description: group.description
//         }, {
//             headers: {
//                 Authorization: `${getAuthToken()}`,
//             },
//         });

//         showAlert({
//             Header: 'Succes',
//             Message: `${group.name} added.`,
//             Type: 'success',
//         });

//         callback();

//         return response.data;
//     } catch (error) {
//         showAlert({
//             Header: 'Error',
//             Message: `Server can't process request.`,
//             Type: 'danger',
//         });
//         return null as any;
//     }
// }

// export const deleteGroup = async (groupId: string, callback: () => void): Promise<Group | undefined> => {
//     if (!checkAuthentication()) return undefined;
//     try {
//         const response = await axios.delete<Group>(`${BASE_URL}/groups/${groupId}`, {
//             headers: {
//                 Authorization: `${getAuthToken()}`,
//             },
//         });

//         showAlert({
//             Header: 'Succes',
//             Message: `Group ${groupId} deleted.`,
//             Type: 'success',
//         });

//         callback();

//         return response.data;
//     } catch (error) {
//         showAlert({
//             Header: 'Error',
//             Message: `Server can't process request.`,
//             Type: 'danger',
//         });
//         return null as any;
//     }
// }

// export const editExistingGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
//     if (!checkAuthentication()) return undefined;
//     try {
//         const response = await axios.patch<Group>(`${BASE_URL}/groups/${group._id}`, {
//             name: group.name,
//             description: group.description
//         }, {
//             headers: {
//                 Authorization: `${getAuthToken()}`,
//             },
//         });

//         showAlert({
//             Header: 'Succes',
//             Message: `Group ${group.name} edited.`,
//             Type: 'success',
//         });

//         callback();

//         return response.data;
//     } catch (error) {
//         showAlert({
//             Header: 'Error',
//             Message: `Server can't process request.`,
//             Type: 'danger',
//         });
//         return null as any;
//     }
// }

// Refactorized code

const apiRequest = async <T>(
    method: string,
    url: string,
    data: object,
    callback: () => void
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

export const createNewGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
    return apiRequest<Group>('post', `${BASE_URL}/groups`, { name: group.name, description: group.description }, callback);
};

export const deleteGroup = async (groupId: string, callback: () => void): Promise<Group | undefined> => {
    return apiRequest<Group>('delete', `${BASE_URL}/groups/${groupId}`, {}, callback);
};

export const editExistingGroup = async (group: Group, callback: () => void): Promise<Group | undefined> => {
    return apiRequest<Group>('patch', `${BASE_URL}/groups/${group._id}`, { name: group.name, description: group.description }, callback);
};

/* Sensors */

export const getPrivateSensors = async (groupId: String): Promise<Sensor[]> => {
    try {
        if (!isAuthenticated()) {
            console.error('User not authenticated');
            throw new Error('User not authenticated');
        }

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

export const getCertainSensor = async (sensorId: String): Promise<Sensor> => {
    try {
        if (!isAuthenticated()) throw new Error('User not authenticated');

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

// export const getSensorData = async (sensorId: String): Promise<SensorData[]> => {
//     if (!isAuthenticated()) throw new Error('User not authenticated');

//     try {
//         const response = await axios.get<{ sensorData: SensorData[] }>(`${BASE_URL}/sensors/${sensorId}/data`, {
//             headers: {
//                 Authorization: `${getAuthToken()}`,
//             },
//         });
//         return response.data as unknown as SensorData[];
//     } catch (error) {
//         console.error('Error fetching sensor data:', error);
//         throw error;
//     }
// }

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
