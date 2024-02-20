import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import Group from '../../interfaces/Group';
import { getAuthToken } from '../auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const instance = Axios.create();
const axios = setupCache(instance);

export const removeCache = async (id: string) => {
    console.log("removing cache" + id);
    await axios.storage.remove(id);
};