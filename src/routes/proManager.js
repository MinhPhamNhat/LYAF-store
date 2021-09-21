//Require Route:
const express = require('express');
const route = express.Router();

//Require controller:
const proManager = require('../app/controllers/ProductController');

//Body
route.get('/',proManager.proManager);
route.get('/create',proManager.create);
route.post('/create/done',proManager.createDone);
route.get('/del/:id',proManager.delete);
module.exports = route;
