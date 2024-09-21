const express = require('express');
const { addReview, getReviews,  } = require('../../controllers/shopping/reviewController');


const reviewRouter = express.Router();

reviewRouter.post('/add' , addReview);

reviewRouter.get('/:productId' , getReviews)



module.exports = reviewRouter;
