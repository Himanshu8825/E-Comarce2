const express = require('express');
const {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
} = require('../../controllers/Admin/AdminOrderController');

const adminOrderRouter = express.Router();

adminOrderRouter.get('/get', getAllOrdersOfAllUser);

adminOrderRouter.get('/details/:id', getOrderDetailsForAdmin);

module.exports = adminOrderRouter;
