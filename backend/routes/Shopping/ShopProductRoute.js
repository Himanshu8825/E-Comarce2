const express = require('express');
const { getFilteredProduct } = require('../../controllers/shopping/productsController');

const shopRouter = express.Router();

shopRouter.get('/get' , getFilteredProduct);


module.exports = shopRouter;
