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
    create: '/add',
    getById: '/getId',
    update: '/update',
    delete: '/delete',
    getByStatusCreate: '/getAllBusByStatusCreate',
    getByStatusEdit: '/getAllByStatusEdit',
  },

  users: {
    base: API_BASE_URL + '/admin'+'/user',
    getList:'/list',
    create: '/add',
    getById: '/getById',
    update: '/update',
  },

  profile: {
    base: API_BASE_URL +'/profile',
    getById: '/getId',
    update: '/update',
  },

  bustype: {
    base: API_BASE_URL + '/admin'+'/bustype',
    getList:'/list',

  },
  blogs: {
    base: API_BASE_URL + '/admin'+ '/blogs',
    list: '/list',   
    getById: '/getById', 
    add: '/add',         
    update: '/update', 
    delete: 'delete' 
  },
  bookings: {
    base: API_BASE_URL + '/admin' + '/bookings',
    list: '/list',   
    ListCanceled: '/canceled',     
    ListConfirmed: '/confirmed',     
    getById: '/getById',  
    // add: '/add',        
    update: '/update',  
    delete: '/delete'    
},
  seats: {
    base: API_BASE_URL + '/admin'+'/seats',
  },
  drivers: {
    base: API_BASE_URL + '/admin'+ '/driver',
    get: '/list',
    create: '/add',
    getById: '/getById',
    update: '/update',
    delete: '/delete',
    getByStatusCreate: '/getByStatusCreate',
    getByStatusEdit: '/getByStatusEdit',
  },
};