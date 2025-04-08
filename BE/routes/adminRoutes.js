const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/Admin/routesController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const { route } = require('./clientRoutes');
const ContacController = require('../controllers/Admin/contactController');

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


module.exports = router;