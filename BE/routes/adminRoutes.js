const express = require('express');
const router = express.Router();
const RoutesController = require('../controllers/Admin/routesController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const { route } = require('./clientRoutes');

//------------------[ ROUTES ]------------
router.get('/routes/list',RoutesController.get);
router.get('/routes/:id',RoutesController.getById);
router.post('/routes/add',RoutesController.create);
router.patch('/routes/update/:id',RoutesController.update);
router.delete('/routes/delete/:id',RoutesController.delete);

// router.post("/login", AuthController.login);


module.exports = router;