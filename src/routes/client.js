const express = require('express');
const route = express.Router();

const ClientController = require('../app/controllers/ClientController');

route.get('/',ClientController.client);
route.get('/product/detail',ClientController.productDetail);
route.get('/product/collection',ClientController.productCollection);

module.exports = route;