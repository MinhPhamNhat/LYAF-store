const express = require('express');
const route = express.Router();
const ClientController = require('../app/controllers/ClientController');

route.get('/',ClientController.client);

module.exports = route;