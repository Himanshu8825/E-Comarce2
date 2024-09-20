const Order = require('../../models/Order');

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

    return res.status(200).json({
      message: 'Order details fetched successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while getting order details', success: false });
  }
};

module.exports = { getAllOrdersOfAllUser , getOrderDetailsForAdmin };
