import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import Group from '../../interfaces/Group';
import { checkAuthentication, getAuthToken } from '../auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const instance = Axios.create();
const axios = setupCache(instance);

// const req1 = axios.get('https://api.example.com/');
// const req2 = axios.get('https://api.example.com/');

export const getPrivateGroupsCached = async (): Promise<Group[] | undefined> => {
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