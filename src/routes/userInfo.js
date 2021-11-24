const express = require('express');
const app = express();
const route = express.Router();
const UserInfoController = require('../app/controllers/UserInfoController');
route.get('/',UserInfoController.start);

module.exports = route;