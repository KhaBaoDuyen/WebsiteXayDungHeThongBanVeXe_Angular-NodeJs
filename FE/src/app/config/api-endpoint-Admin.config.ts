import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT_AD = {
  routes: {
    base: API_BASE_URL + '/admin'+ '/routes',
    getRoutes: '/list',
    createRoutes: '/add',
    getRoutesById: '/getId',
    updateRoutes: '/update',
    deleteRoutes: '/delete',
  },
  contact:{
    base: API_BASE_URL + '/admin'+'/contact',
    getList:'/list',
    getById:'/getById',
    update:'/update'
  }
};