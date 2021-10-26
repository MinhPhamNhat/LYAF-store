const proModel = require('../models/Product');
class ClientController{

    client(req,res,next){
        res.render('client');
    }

    productDetail(req,res,next){
        
        res.render('productDetail');
    }

    productCollection(req,res,next){
        
        res.render('productCollection');
    }
}

module.exports = new ClientController;