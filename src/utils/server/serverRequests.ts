import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';



import { checkAuthentication, getAuthToken } from '../auth';
import { showAlert } from '../user_interaction/alertController';
import Group from '../../interfaces/Group';
import { cacheAllGroups } from './cacheGroups';
const instance = Axios.create();
const axios = setupCache(instance);

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Some requests id's
//let profileInfoId;
//let userInfoId;

export const createNewGroup1 = async (group: Group, callback: () => void): Promise<Group | undefined> => {


    const url = `${BASE_URL}/groups`;
    const data = { name: group.name, description: group.description };

    const response = await axios.post(url, data, {
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      });

      
      
   return response.data;
    
    
 
};
        // cache: {
        //     update: {
        //         // Evicts the profile info cache, because now he is authenticated and the response needs to be re-fetched
        //         [profileInfoId]: 'delete',

        //         // An example that update the "group info response cache" when doing a login.
        //         // Imagine this request is a login one.
        //         [groupInfoResponseId]: (cachedValue, response) => {
        //         if (cachedValue.state !== 'cached') {
        //             // Only needs to update if the response is cached
        //             return 'ignore';
        //         }

        //         cachedValue.data = data;

        //         // This returned value will be returned in next calls to the cache.
        //         return cachedValue;
        //         }
        //     }



// const apiRequest = async <T>(
//     method: string,
//     url: string,
//     data: object,
//     callback: () => void
// ): Promise<T | undefined> => {
//     if (!checkAuthentication()) return undefined;
//     try {
//         // const config: AxiosRequestConfig = {
//         //     method,
//         //     url,
//         //     data,
//         //     headers: {
//         //         Authorization: `${getAuthToken()}`,
//         //     },
            
//         // };

//         // const response = await axios(config);
//         interface ListGroupsCache {
//             state: string; // Update this based on your actual CachedResponse type
//             data: {
//               groups: Group[];
//               // Add other properties based on your actual CachedResponse type
//             };
//           }
          

//         const response = axios.post(
//             '/posts',
//             data,
//          {
//               cache: {
//                 update: {
//                   // Will perform a cache update for the `list-posts` respective
//                   // cache entry.
//                   'list-groups': (listGroupsCache: ListGroupsCache, createGroupResponse) => {
//                     // If the cache is does not has a cached state, we don't need
//                     // to update it
//                     if (listGroupsCache.state !== 'cached') {
//                       return 'ignore';
//                     }
        
//                     // Imagine the server response for the `list-posts` request
//                     // is: { posts: Post[]; }, and the `create-post` response
//                     // comes with the newly created post.
        
//                     // Adds the created post to the end of the post's list
//                     listGroupsCache.data.groups.push(createGroupResponse.data);
        
//                     // Return the same cache state, but a updated one.
//                     return listGroupsCache;
//                   }
//                 }
//               }
//             }
//           );
        

//         showAlert({
//             Header: 'Success',
//             Message: `${(data as Group).name || ''} ${getSuccessMessage(method)}`,
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
// };

// const getSuccessMessage = (method: string): string => {
//     switch (method) {
//         case 'post':
//             return 'added.';
//         case 'delete':
//             return 'deleted.';
//         case 'patch':
//             return 'edited.';
//         default:
//             return '';
//     }
// };





// const apiInstance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add caching interceptor
// apiInstance.interceptors.request.use((config) => {
//     // You can customize caching configurations here
//     config.headers['Cache-Control'] = 'no-cache';
//     return config;
// });

// apiInstance.interceptors.response.use(
//     (response: AxiosResponse) => {
//         // Update cache logic here if needed
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

/* Api Requests */

// export const apiRequest = async <T>(
//     method: string,
//     url: string,
//     data: object,
//     callback: () => void
// ): Promise<T | undefined> => {
//     if (!checkAuthentication()) return undefined;
//     try {
//         const config: AxiosRequestConfig = {
//             method,
//             url,
//             data,
//             headers: {
//                 Authorization: `${getAuthToken()}`,
//             },
//         };

//         const response = await apiInstance(config);

//         showAlert({
//             Header: 'Success',
//             Message: `${(data as Group).name || ''} ${getSuccessMessage(method)}`,
//             Type: 'success',
//         });

//         callback();

//         return response.data;
//     } catch (error) {
//         console.log(error)
//         showAlert({
//             Header: 'Error',
//             Message: `Server can't process request.`,
//             Type: 'danger',
//         });
//         return null as any;
//     }
// };

// const getSuccessMessage = (method: string): string => {
//     switch (method) {
//         case 'post':
//             return 'added.';
//         case 'delete':
//             return 'deleted.';
//         case 'patch':
//             return 'edited.';
//         default:
//             return '';
//     }
// };

// axios.post<{ auth: { user: User } }>(
//     'login',
//     { username, password },
//     {
//       cache: {
//         update: {
//           // Evicts the profile info cache, because now he is authenticated and the response needs to be re-fetched
//           [profileInfoId]: 'delete',
  
//           // An example that update the "user info response cache" when doing a login.
//           // Imagine this request is a login one.
//           [userInfoResponseId]: (cachedValue, response) => {
//             if (cachedValue.state !== 'cached') {
//               // Only needs to update if the response is cached
//               return 'ignore';
//             }
  
//             cachedValue.data = data;
  
//             // This returned value will be returned in next calls to the cache.
//             return cachedValue;
//           }
//         }
//       }
//     }
//   );