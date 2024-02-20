import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import Group from '../../interfaces/Group';
import { getAuthToken } from '../auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axios = Axios.create();
// const instance = Axios.create();
// const axios = setupCache(instance);

/* GET requests */

export const cacheGroupById = async (groupId: string, useCache: boolean): Promise<Group | undefined> => {
    const request = `${BASE_URL}/groups/${groupId}`;
    try {
        const response = await axios.get<{ group: Group }>(request, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
            // id: 'get-groups',
            // cache: {
            //     override: !useCache
            // }
        });

        // if (!useCache) {
        //     await axios.storage.remove('get-groups');
        // }

        return response.data.group;
    } catch (error) {
        console.error('Error fetching private groups data:', error);
        throw error;
    }
}

export const cacheAllGroups = async (useCache: boolean): Promise<Group[] | undefined> => {
    const request = `${BASE_URL}/groups`;
    try {
        const response = await axios.get<{ groups: Group[] }>(request, {
            headers: {
                Authorization: `${getAuthToken()}`,
            },
            // id: 'get-groups',
            // //cache: useCache ? {} : false,
            // cache: {
            //     override: !useCache
            // }
        });

        // if (!useCache) {
        //     await axios.storage.remove('get-groups');
        // }

        return response.data.groups;
    } catch (error) {
        console.error('Error fetching private groups data:', error);
        throw error;
    }
};