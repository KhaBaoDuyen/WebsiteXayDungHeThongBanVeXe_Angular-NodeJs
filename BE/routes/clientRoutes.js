const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthController = require('../controllers/Client/authController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const ContacController = require('../controllers/Client/contactController');
const FilterController = require('../controllers/Client/filterController');
const RoutesController = require('../controllers/Admin/routesController')
const timeTableController = require('../controllers/Client/timeTableComtroller');
const HistoryBookingController = require('../controllers/Client/historyBooking');
const ProfileController = require('../controllers/Client/profileController');
const upload = require('../config/multer');
//------------------[ AUTH ]------------------
router.post('/register',AuthController.register);
router.post("/login", AuthController.login);

router.post("/resetPassword", AuthController.resetPasswod);
router.patch('/resetPassword/reset/:token', AuthController.updatePassword)


//------------------[ CONTACT ]------------------
router.post('/contact/question', ContacController.create);

//-------------------[ SREACH OPTION ]-----------------
router.get('/home/list', RoutesController.get);
router.post('/home/search', FilterController.filterBuses);

//--------------------[ TIMETABLE ]---------------------
router.get('/timetable/list', timeTableController.timeTable);
router.get('/timetable/getById/:id', timeTableController.getById);

//--------------------[ BOOKING ]--------------------------
router.post('/booking', timeTableController.booking);

//--------------------[ HISTORY TICKETS]--------------------
router.post('/historyTickets', HistoryBookingController.historyTicket);
router.patch('/cancelTicket', HistoryBookingController.cancelTicket);

//------------------[ PROFILE ]------------------
router.get('/profile/list',ProfileController.get);
router.get('/profile/getId/:id',ProfileController.getById);
router.patch('/profile/update/:id', upload.single('avatar'), ProfileController.update);

module.exports = router;