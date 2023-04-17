const express = require('express');
const routerCheckout = express.Router();
const ordersController = require('../controllers/CheckoutController');

// Tạo đơn hàng mới
routerCheckout.post('/api/orders', ordersController.createOrder);

module.exports = routerCheckout;