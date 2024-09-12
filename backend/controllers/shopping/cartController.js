const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const populateCartItems = (items) => {
  return items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : 'Product not found',
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Invalid Data Provided', success: false });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    return res
      .status(200)
      .json({ message: 'Product added to cart successfully', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while adding to cart', success: false });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Invalid User ID', success: false });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart not found', success: false });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
      return res.status(400).json({
        message: 'Some products are no longer available',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Cart items fetched successfully',
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems(validItems),
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while fetching cart items', success: false });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Invalid Data Provided', success: false });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart not found', success: false });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Product not found in cart', success: false });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    return res.status(200).json({
      message: 'Cart updated successfully',
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems(cart.items),
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while updating cart items', success: false });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID or product ID', success: false });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart not found', success: false });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.populate({
      path: 'items.productId',
      select: 'image title price salePrice',
    });

    await cart.save();

    return res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems(cart.items),
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while deleting cart items', success: false });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
};
