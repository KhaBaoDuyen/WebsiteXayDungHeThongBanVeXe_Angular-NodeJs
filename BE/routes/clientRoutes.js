const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const AuthController = require('../controllers/Client/authController');
const { checkJWT, isAdmin } = require('../services/authCheck');
const ContacController = require('../controllers/Client/contactController');

//------------------[ AUTH ]------------------
router.post('/register',AuthController.register);
router.post("/login", AuthController.login);

//------------------[ CONTACT ]------------------
router.post('/contact/question', ContacController.create);

module.exports = router;