const express = require('express');
const route = express.Router();
const AccessController = require('../app/controllers/AccessController');
route.get('/login',AccessController.login);
route.get('/logout');
module.exports = route;