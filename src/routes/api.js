const express = require('express');
const route = express.Router();

const APIController = require('../app/controllers/APIController');

route.get('/getSetupList',APIController.getSetupList);

module.exports = route;