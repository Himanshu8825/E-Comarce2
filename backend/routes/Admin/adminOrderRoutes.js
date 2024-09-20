const express = require('express');
const {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require('../../controllers/Admin/AdminOrderController');

const adminOrderRouter = express.Router();

adminOrderRouter.get('/get', getAllOrdersOfAllUser);

adminOrderRouter.get('/details/:id', getOrderDetailsForAdmin);

adminOrderRouter.put('/update/:id', updateOrderStatus);

module.exports = adminOrderRouter;
