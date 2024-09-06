const express = require('express');
const { upload } = require('../../helpers/cloudinary');
const {
  handleImageUpload,
  addProducts,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} = require('../../controllers/Admin/productController');

const productRouter = express.Router();

productRouter.post(
  '/upload-image',
  upload.single('my_file'),
  handleImageUpload
);

productRouter.post('/create-product', addProducts);

productRouter.get('/getAll-products', fetchAllProducts);

productRouter.put('/edit-product/:id', editProduct);

productRouter.delete('/delete-product/:id', deleteProduct);

module.exports = productRouter;
