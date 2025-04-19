import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL ,
    register: '/register',
    login: '/login',
    resetPassword:'/resetPassword',
    resetNewPassword:'/resetPassword/reset'
  },
  apiRoutes: {
    base: API_BASE_URL + '/apiRoutes',
    getProvinces: '/provinces',
    getDistricts: '/districts',
    getWards: '/wards',
  },
  contact:{
    base: API_BASE_URL + '/contact',
    question: '/question',
  },
  home:{
    base: API_BASE_URL + '/home',
    getOption:'/list',
    search:'/search',
  },
  timeTable:{
    base: API_BASE_URL + '/timetable',
    get:'/list',
    getById:'/getById',

  },
  booking:{
    base: API_BASE_URL,
    create:'/booking'
  }
};