const express = require('express');
const {
  addToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
} = require('../../controllers/shopping/cartController');

const cartRouter = express.Router();

cartRouter.post('/add', addToCart);

cartRouter.get('/get/:userId', fetchCartItems);

cartRouter.put('/update-cart', updateCartItems);

cartRouter.delete('/:userId/:productId', deleteCartItems);

module.exports = cartRouter;
