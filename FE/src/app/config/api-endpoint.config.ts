import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL ,
    register: '/register',
    login: '/login',
  },
  apiRoutes: {
    base: API_BASE_URL + '/apiRoutes',
    getProvinces: '/provinces',
    getDistricts: '/districts',
    getWards: '/wards',
  },
  routes: {
    base: API_BASE_URL + '/admin'+ '/routes',
    getRoutes: '/list',
    createRoutes: '/add',
    getRoutesById: '/getId',
    updateRoutes: '/update',
    deleteRoutes: '/delete',
  },
};