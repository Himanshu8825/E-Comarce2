const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');

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
          return_url: 'http://localhost:5173/shop/paypal-return',
          cancel_url: 'http://localhost:5173/shop/paypal-cancel',
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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while capturing payment ', success: false });
  }
};

module.exports = { createOrder, capturePayment };
