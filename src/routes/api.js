const express = require('express');
const route = express.Router();

const APIController = require('../app/controllers/APIController');

route.get('/',APIController.client);
route.get('/product/detail',APIController.productDetail);
route.get('/product/collection',APIController.productCollection);

module.exports = route;