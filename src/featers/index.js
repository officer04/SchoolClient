import axios from 'axios';
import { BaseURL } from '../utils/conts';

const instance = axios.create({
  baseURL: BaseURL,
});

const authAxios = axios.create({
  baseURL: BaseURL,
});

const authInterceptor = (config) => {
  config.headers['auth_token'] = localStorage.getItem('token');
  return config;
};

instance.interceptors.request.use(authInterceptor);
// instance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     console.log(error);
//     return error.response;
//   },
// );

export { authAxios, instance };
