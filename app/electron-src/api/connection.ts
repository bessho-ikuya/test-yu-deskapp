import axios from 'axios';
import {getStorage} from '../lib/local-storage'
import {localStorageKey} from '../constants/local-storage-key'

const apiconnect = ({} = {}) => {
  const baseURL = 'http://' + getStorage(localStorageKey.API_IP) + ':8000'
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 6000000, //optional
    headers: {
      'Content-Type': 'application/json',
    }
  });

//   instance.interceptors.request.use(
//     async config => {
//         if (token !== null) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       error => Promise.reject(error)
//   );

  return instance;
};

export default apiconnect;