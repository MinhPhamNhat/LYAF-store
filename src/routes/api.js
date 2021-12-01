const express = require('express');
const route = express.Router();
const upload = require('../middleware/multer')
const validator = require('../middleware/validator')
const authen = require('../middleware/authen')

const APIController = require('../app/controllers/APIController');

route.get('/getSetupList',APIController.getSetupList);
route.get('/getCategory',APIController.getCategory);
route.get('/addCart', validator.cartValidator(), APIController.addCart)
route.get('/removeCart', APIController.removeCart)
route.get('/getCart', APIController.getCart)
route.get('/checkout', authen.apiAuthenLogin)
route.get('/getShipperBills', APIController.getShipperBills)
route.post('/checkout', authen.authenLogin3, validator.checkOutValidator(), APIController.checkOut)
route.get('/product/search', APIController.search);
route.get('/product/getSub', validator.subProductValidator(), APIController.getSub);
route.get('/product/getMinMax', APIController.getMinMaxPrice);
route.get('/manager/getBills', APIController.getBills);
route.get('/manager/manageBills', APIController.manageBills);
route.get('/manager/shipBills', APIController.shipBills);
route.get('/manager/getProducts', APIController.getProducts)
route.post('/product/filter', APIController.filter);
route.post('/manager/confirmBill', APIController.confirmBill);
route.post('/manager/billState', APIController.billState);
route.post('/manager/billPayment', APIController.billPayment);
route.post('/manager/confirmSuccessDelivery', APIController.confirmSuccessDelivery)
route.post('/manager/confirmDelivery',authen.apiAuthenShipper, APIController.confirmDelivery);
route.post('/product/add', upload.array('images', 10), validator.productValidator(), APIController.addProduct);
route.post('/product/updateQuantity', APIController.updateQuantity);
route.post('/product/updateName', APIController.updateName);
route.post('/product/updateSale', APIController.updateSale);
route.post('/product/updatePrice', APIController.updatePrice);
route.post('/product/updateNew', APIController.updateNew);
route.post('/product/updateDesc', APIController.updateDesc);
route.post('/product/updateImages', upload.array('images', 10), APIController.updateImages);
route.post('/product/updateSub', APIController.updateSub);
route.delete('/product/removeProduct', APIController.removeProduct);
route.get('/product/getImages', APIController.getImages);
route.get('/province', APIController.province)
route.get('/district/:id', APIController.district)
route.get('/ward/:id', APIController.ward)
module.exports = route;