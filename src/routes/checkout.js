const express = require('express');
const route = express.Router();
const upload = require('../middleware/multer')
const validator = require('../middleware/validator')
const authen = require('../middleware/authen')

const CheckoutController = require('../app/controllers/CheckoutController');

route.get('/', CheckoutController.index);
route.post('/showAddress', CheckoutController.showAddress);
route.post('/pushAddress', CheckoutController.pushAddress);
module.exports = route;