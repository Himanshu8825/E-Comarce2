const express = require('express');
const { createOrder } = require('../../controllers/shopping/orderController');

const orderRouter = express.Router();

orderRouter.post('/create' , createOrder)


module.exports = orderRouter;
