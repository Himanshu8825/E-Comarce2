const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: String,
    productId: String,
    username: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
