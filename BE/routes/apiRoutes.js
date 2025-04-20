const express = require('express');
const router = express.Router();
const getProvinces = require('../services/ApiRoutes').getProvinces;
const getDistricts = require('../services/ApiRoutes').getDistricts;
const getWards = require('../services/ApiRoutes').getWards;
const PaymentController = require('../controllers/Client/paymentController');


//------------------[ API ROUTES ]------------------
router.get('/apiRoutes/provinces', getProvinces);
router.get('/apiRoutes/districts', getDistricts);
router.get('/apiRoutes/wards', getWards);


router.post('/payment/create', PaymentController.createPayment); // Tạo URL thanh toán
router.get('/payment/vnpay-return', PaymentController.handlePaymentReturn); // Xử lý kết quả

module.exports = router;