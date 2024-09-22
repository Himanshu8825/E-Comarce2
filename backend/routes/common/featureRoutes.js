const express = require('express');
const {
  addFeatureImage,
  getFeatureImages,
} = require('../../controllers/common/Feature');

const featureRoute = express.Router();

featureRoute.post('/add', addFeatureImage);

featureRoute.get('/get', getFeatureImages);

module.exports = featureRoute;
