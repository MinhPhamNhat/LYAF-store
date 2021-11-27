//Require Route:
const express = require('express');
const route = express.Router();

//Require controller:
const proManager = require('../app/controllers/ProductController');

//Body
route.get('/',proManager.proManager);
route.get('/add',proManager.create);
route.get('/list',proManager.list);
route.get('/bill/detail/:id',proManager.detail);
route.get('/bill',proManager.bill);
route.get('/property',proManager.property);
route.post('/sizeManager',proManager.sizeManager);
route.post('/addsize',proManager.addsize);
route.post('/deletesize',proManager.deletesize);
route.post('/updatesize',proManager.updatesize);
module.exports = route;
