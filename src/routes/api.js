const express = require('express');
const route = express.Router();
const upload = require('../middleware/multer')
const validator = require('../middleware/validator')
const authen = require('../middleware/authen')

const APIController = require('../app/controllers/APIController');

route.get('/getSetupList',APIController.getSetupList);
route.get('/addCart', validator.cartValidator(), APIController.addCart)
route.get('/removeCart', APIController.removeCart)
route.get('/getCart', APIController.getCart)
route.get('/checkout', authen.apiAuthenLogin)
route.get('/product/getSub', validator.subProductValidator(), APIController.getSub);
route.post('/product/add', upload.array('images', 10), validator.productValidator(), APIController.addProduct);

module.exports = route;