import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const production = 0;
const baseURL = production ? process.env.API_URL_PROD : process.env.API_URL;
const token = LocalStorage.getItem('access_token');

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:9000',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  data: {},
});

// api.interceptors.request.use(
//   async (config) => {
//     config.headers = {

//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

const file_url = production ? process.env.FILE_URL_PROD : process.env.FILE_URL;
// const vue_url = production ? 'https://atcreando.com' : 'http://localhost:9000';
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$file_url = file_url;
});

export { api, file_url };
