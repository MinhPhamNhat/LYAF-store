const express = require('express');
const route = express.Router();
const ClientController = require('../app/controllers/ClientController');

route.get('/',(req,res,next)=>{
    if(req.user !=undefined){
        if(req.user.role == 'user'){
            next();
        }
        else{
          req.user.boss = '1';
          next();
        }
        
    }
    else{
        next()
    }
}
,ClientController.client);
route.get('/product/detail/:id', ClientController.productDetail);
route.get('/product/collection', ClientController.productCollection);

module.exports = route;