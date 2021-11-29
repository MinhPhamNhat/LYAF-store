//Require Route:
const express = require('express');
const route = express.Router();
const multer = require('../middleware/multer');
//Require controller:
const proManager = require('../app/controllers/ManagementController');

//Body
route.get('/',proManager.proManager);
route.get('/add',proManager.create);
route.get('/list/detail/:id',proManager.productDetail);
route.get('/list',proManager.list);
route.get('/bill/detail/:id',proManager.billDetail);
route.get('/bill',proManager.bill);
route.get('/property',proManager.property);
route.post('/sizeManager',proManager.sizeManager);
route.post('/addsize',proManager.addsize);
route.post('/deletesize',proManager.deletesize);
route.post('/updatesize',proManager.updatesize);
route.post('/categoryManager',proManager.categoryManager);
route.post('/categoryParent',proManager.categoryParent);
route.post('/addcategory',proManager.addcategory);
route.post('/deletecategory',proManager.deletecategory);
route.post('/updatecategory',proManager.updatecategory);
route.post('/colorManager',proManager.colorManager);
route.post('/addcolor',multer.single('colorImage'),proManager.addcolor);
route.post('/deletecolor',multer.single('colorImage'),proManager.deletecolor);
route.post('/updatecolor',multer.single('colorImage'),proManager.updatecolor);
route.get('/account',proManager.account);
route.get('/accountManager',proManager.accManager);
route.get('/accountDetail/:id',proManager.accDetail);
route.post('/addaccount',proManager.addacc);
route.post('/deleteaccount',proManager.deleteacc);
route.post('/updateaccount',proManager.updateacc);
module.exports = route;
