const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const createPaymentJson = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
      },
      transactions: [ 
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              quantity: item.quantity,
              price: item.price.toFixed(2).toString(),
              currency: 'USD',
            })),
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2).toString(),
          },
          description: 'Order from E-Commerce website',
        },
      ],
    };

    paypal.payment.create(createPaymentJson, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Error while creating paypal payment',
          success: false,
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === 'approval_url'
        ).href; // fixed URL extraction

        if (!approvalURL) {
          return res.status(400).json({
            message: 'Order creation failed',
            success: false,
          });
        }

        return res.status(201).json({
          message: 'Order created successfully',
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while creating order ', success: false });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    // console.log('Capturing payment with:', { paymentId, payerId, orderId });

    let order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ message: 'Order not found', success: false });
    }

    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Not enough stock for this product ${product.title}`,
          success: false,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const cartId = order.cartId;
    await Cart.findByIdAndDelete(cartId);

    await order.save();

    return res.status(200).json({
      message: 'Order done successfully ',
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while capturing payment ', success: false });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

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

const getOrderDetails = async (req, res) => {
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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
