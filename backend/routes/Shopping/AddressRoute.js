const express = require('express');
const {
  addAddress,
  fetchAddress,
  editAddress,
  deleteAddress,
} = require('../../controllers/shopping/addressController');

const addressRouter = express.Router();

addressRouter.post('/add', addAddress);

addressRouter.get('/get/:userId', fetchAddress);

addressRouter.put('/update/:userId/:addressId', editAddress);

addressRouter.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = addressRouter;
