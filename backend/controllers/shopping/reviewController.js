const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

const addReview = async (req, res) => {
  try {
    const { userId, productId, username, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      'cartItems.productId': productId,
      orderStatus: 'confirmed',
    });

    if (!order) {
      return res.status(403).json({
        message: 'You need to purchase product to review it.',
        success: false,
      });
    }

    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({
        message: 'You have already reviewed this product.',
        success: false,
      });
    }

    const newReview = new Review({
      userId,
      productId,
      username,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });

    const totalReviewsLength = reviews.length;

    const avgReview =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { avgReview });

    return res.status(201).json({
      message: 'Review added successfully',
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while adding review', success: false });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error while getting reviews', success: false });
  }
};


module.exports = {addReview , getReviews}
