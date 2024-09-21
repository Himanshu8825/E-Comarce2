

const express = require('express');
const searchproducts = require('../../controllers/shopping/searchController');

const searchRouter = express.Router();

searchRouter.get('/:keyword' , searchproducts)


module.exports = searchRouter;
