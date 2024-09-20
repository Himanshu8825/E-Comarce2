const express = require('express');
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require('../../controllers/shopping/orderController');

const orderRouter = express.Router();

orderRouter.post('/create', createOrder);
orderRouter.post('/capture', capturePayment);

orderRouter.get('/list/:userId', getAllOrdersByUser);

orderRouter.get('/details/:id', getOrderDetails);

module.exports = orderRouter;
