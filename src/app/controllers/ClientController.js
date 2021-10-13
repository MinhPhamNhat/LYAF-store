const proModel = require('../models/Product');
class ClientController{

    client(req,res,next){
        res.render('client');
    }

    productDetail(req,res,next){
        
        res.render('productDetail');
    }
}

module.exports = new ClientController;