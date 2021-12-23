import axios from 'axios';

const apiconnect = ({} = {}) => {
  const baseURL = 'http://localhost:8080'
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 500000,
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