const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthController = require('../controllers/Client/authController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const ContacController = require('../controllers/Client/contactController');
const HomeController = require('../controllers/Client/homeController')
const RoutesController = require('../controllers/Admin/routesController')
//------------------[ AUTH ]------------------
router.post('/register',AuthController.register);
router.post("/login", AuthController.login);

router.post("/resetPassword", AuthController.resetPasswod);
router.patch('/resetPassword/reset/:token', AuthController.updatePassword)


//------------------[ CONTACT ]------------------
router.post('/contact/question', ContacController.create);

//-------------------[ SREACH OPTION ]-----------------
router.get('/home/list', RoutesController.get);
router.post('/home/search', HomeController.filterBuses);

//--------------------[ TIMETABLE ]---------------------
router.get('/timetable/list', HomeController.timeTable);


module.exports = router;