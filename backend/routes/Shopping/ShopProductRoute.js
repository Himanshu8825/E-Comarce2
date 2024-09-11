const express = require('express');
const { getFilteredProduct, getProductDetails } = require('../../controllers/shopping/productsController');

const shopRouter = express.Router();

shopRouter.get('/get' , getFilteredProduct);
shopRouter.get('/get/:id' , getProductDetails);


module.exports = shopRouter;
