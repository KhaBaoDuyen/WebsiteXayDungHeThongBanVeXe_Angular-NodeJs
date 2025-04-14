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
  },
  trips: {
    base: API_BASE_URL + '/admin'+'/trips',
    getList:'/list',
    create: '/add',
    getById:'/getById',
    update:'/update',
  },
  buses: {
    base: API_BASE_URL + '/admin'+'/buses',
    getList:'/list',

  },
  drivers: {
    base: API_BASE_URL + '/admin'+'/drivers',
    getList:'/list',

  },
  seats: {
    base: API_BASE_URL + '/admin'+'/seats',
  }
};