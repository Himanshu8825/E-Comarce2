const Order = require('../../models/Order');
const User = require('../../models/User');

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: 'No orders found !', success: false });
    }

    return res.status(200).json({
      message: 'Orders fetched successfully',
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while getting all orders', success: false });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ message: ' Orders details not found !', success: false });
    }

    const user = await User.findById(order.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found!', success: false });
    }

    return res.status(200).json({
      message: 'Order details fetched successfully',
      success: true,
      data: { order, user },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while getting order details', success: false });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ message: ' Orders details not found !', success: false });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    return res
      .status(200)
      .json({ message: ' Order status updated successfully !', success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while updating order status', success: false });
  }
};

module.exports = {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
