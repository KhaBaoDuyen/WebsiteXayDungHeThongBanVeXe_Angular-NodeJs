const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/Admin/routesController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const { route } = require('./clientRoutes');
const ContacController = require('../controllers/Admin/contactController');
const TripsController = require('../controllers/Admin/tripsController');
const BusesController = require('../controllers/Admin/busesController');
const DriversController = require('../controllers/Admin/driversController');
const SeatsController = require('../controllers/Admin/seatsController');
const BlogsController = require('../controllers/Admin/blogsController');
const BusTypeController = require('../controllers/Admin/busTypeController');
const UserController = require('../controllers/Admin/userController');

const DriverController = require('../controllers/Admin/driversController');
const upload = require('../config/multer');
//------------------[ ROUTES ]------------
router.get('/routes/list',RoutesController.get);
router.get('/routes/getId/:id',RoutesController.getById);
router.post('/routes/add',RoutesController.create);
router.patch('/routes/update/:id',RoutesController.update);
router.delete('/routes/delete/:id',RoutesController.delete);

// router.post("/login", AuthController.login);

//------------------[ CONTACT ]-------------
router.get('/contact/list', ContacController.get);
router.get('/contact/getById/:id', ContacController.getById);
router.patch('/contact/update/:id', ContacController.update)
router.delete('/contact/:id', ContacController.delete);

//-----------------[ TRIPS ]-----------------
router.get('/trips/list', TripsController.get);
router.get('/trips/getById/:id', TripsController.getById);
router.post('/trips/add', TripsController.create);
router.patch('/trips/update/:id', TripsController.update);
router.delete('/trips/:id', TripsController.delete);

//-----------------[ BLOGS ]-----------------
router.get('/blogs/list', BlogsController.get);
router.get('/blogs/getById/:id', BlogsController.getById);
router.post('/blogs/add', BlogsController.create);
router.patch('/blogs/update/:id', BlogsController.update);
router.delete('/blogs/:id', BlogsController.delete);

//-----------------[ BUSES ]-----------------
router.get('/buses/list', BusesController.get);
router.get('/buses/getId/:id',BusesController.getById);
router.post('/buses/add',BusesController.create);
router.patch('/buses/update/:id',BusesController.update);
router.delete('/buses/delete/:id',BusesController.delete);
router.get('/buses/getAllBusByStatusCreate', BusesController.getAllBusByStatusCreate);
router.get('/buses/getAllByStatusEdit/:tripId', BusesController.getAllByStatusEdit);

//-----------------[ SEATS ]-------------------
router.get('/seats/:busID', SeatsController.get);
router.put('/seats/:id', SeatsController.update);

//---------------------[ DRIVER ]-----------------
router.get('/driver/list', DriverController.get);
router.get('/driver/getById/:id', DriverController.getById);
router.post('/driver/add', 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'fileName', maxCount: 5 }
  ]), DriverController.create
);
router.patch('/driver/update/:id',upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'fileName', maxCount: 5 }
]), DriverController.update)
router.delete('/driver/delete/:id', DriverController.delete);
router.get('/driver/getByStatusCreate', DriverController.getAllByStatusCreate);
router.get('/driver/getByStatusEdit/:tripId', DriverController.getAllByStatusEdit);

//-----------------[ BUSTYPES ]-----------------
router.get('/busType/list',BusTypeController.get);
router.get('/busType/getId/:id',BusTypeController.getById);
router.post('/busType/add',BusTypeController.create);
router.patch('/busType/update/:id',BusTypeController.update);
router.delete('/busType/delete/:id',BusTypeController.delete);

//------------------[ User]-------------
router.get('/user/list', UserController.get);
router.get('/user/getById/:id', UserController.getById);
router.post('/user/add', upload.single('avatar'), UserController.create);
router.patch('/user/update/:id', upload.single('avatar'), UserController.update);
router.delete('/user/:id', UserController.delete);

//-----------------[ BUSTYPES ]-----------------
router.get('/busType/list',BusTypeController.get);
router.get('/busType/getId/:id',BusTypeController.getById);
router.post('/busType/add',BusTypeController.create);
router.patch('/busType/update/:id',BusTypeController.update);
router.delete('/busType/delete/:id',BusTypeController.delete);

module.exports = router;