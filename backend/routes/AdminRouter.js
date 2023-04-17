const express = require('express');
const { loginAdmin } = require('../controllers/AdminController');

const routerAdmin = express.Router();

routerAdmin.post('/api/admin/login', loginAdmin);

module.exports = routerAdmin;