const express = require('express');
const route = express.Router();
const upload = require('../middleware/multer')
const validator = require('../middleware/validator')

const APIController = require('../app/controllers/APIController');

route.get('/getSetupList',APIController.getSetupList);
route.post('/product/add', upload.array('images', 10), validator.productValidator(), APIController.addProduct);

module.exports = route;