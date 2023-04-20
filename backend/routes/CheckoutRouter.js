const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/CheckoutController');

// Tạo đơn hàng mới
router.post('/api/orders', ordersController.createOrder);

// Lấy danh sách tất cả đơn hàng
router.get('/api/orders', ordersController.getAllOrders);

// Lấy danh sách đơn hàng của một người dùng
router.get('/api/orderdetail/:id', ordersController.getOrdersByUserId);

// Cập nhật trạng thái của một chi tiết đơn hàng
router.put('/api/orders/:orderDetailId', ordersController.updateOrderDetailStatus);

module.exports = router;