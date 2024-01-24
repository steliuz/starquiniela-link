import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const development = 0;
const production = 1;
const baseURL = development
  ? process.env.API_URL_DEV
  : production
  ? process.env.API_URL_PROD
  : process.env.API_URL;
const token = LocalStorage.getItem('access_token');

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  data: {},
});

// api.interceptors.request.use(
//   async (config) => {
//     config.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

const file_url = development
  ? process.env.FILE_URL_DEV
  : production
  ? process.env.FILE_URL_PROD
  : process.env.FILE_URL;

const vue_url = development
  ? 'https://starquiniela.com'
  : production
  ? 'https://dev.starquiniela.com'
  : 'http://localhost:9000';

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$file_url = file_url;
});

export { api, file_url, vue_url };
