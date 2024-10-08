const { imageUploadUtils } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await imageUploadUtils(url);

    return res.status(200).json({
      message: 'Image uploaded successfully',
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error uploading image', success: false });
  }
};

//! Add a new Product
const addProducts = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStock,
    } = req.body;

    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !salePrice ||
      !brand ||
      !totalStock
    ) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const product = new Product({
      image,
      title,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStock,
    });

    await product.save();

    return res
      .status(201)
      .json({ message: 'Product added successfully', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while uploading', success: false });
  }
};

//! Fetch all Products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found', success: false });
    }

    return res.status(200).json({
      message: 'Products fetched successfully',
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while fetching', success: false });
  }
};

//! Edit Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStock,
    } = req.body;

    // Check if all required fields are present
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !brand ||
      salePrice === undefined ||
      !totalStock ||
      !image
    ) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });
    }

    findProduct.title = title;
    findProduct.description = description;
    findProduct.category = category;
    findProduct.brand = brand;
    findProduct.price = price;
    findProduct.salePrice = salePrice;
    findProduct.totalStock = totalStock;
    findProduct.image = image;

    await findProduct.save();

    return res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while editing product', success: false });
  }
};

//! Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while deleting product', success: false });
  }
};

module.exports = {
  handleImageUpload,
  addProducts,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
