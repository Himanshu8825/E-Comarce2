const express = require('express');
const { upload } = require('../../helpers/cloudinary');
const {
  handleImageUpload,
} = require('../../controllers/Admin/productController');

const productRouter = express.Router();

productRouter.post('upload-image', upload.single('my_file'), handleImageUpload);

module.exports = productRouter;
