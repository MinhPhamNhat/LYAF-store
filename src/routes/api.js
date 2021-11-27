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
route.post('/checkout', authen.authenLogin3, validator.checkOutValidator(), APIController.checkOut)
route.get('/product/search', APIController.search);
route.get('/product/getSub', validator.subProductValidator(), APIController.getSub);
route.get('/product/getMinMax', APIController.getMinMaxPrice);
route.get('/manager/getBills', APIController.getBills);
route.get('/manager/getProducts', APIController.getProducts)
route.post('/manager/billState', APIController.billState);
route.post('/manager/billPayment', APIController.billPayment);
route.post('/product/add', upload.array('images', 10), validator.productValidator(), APIController.addProduct);
route.get('/province', APIController.province)
route.get('/district/:id', APIController.district)
route.get('/ward/:id', APIController.ward)
module.exports = route;