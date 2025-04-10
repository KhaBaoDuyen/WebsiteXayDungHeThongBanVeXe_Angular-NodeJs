const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/Admin/routesController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const { route } = require('./clientRoutes');
const ContacController = require('../controllers/Admin/contactController');
const TripsController = require('../controllers/Admin/tripsController');

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
module.exports = router;