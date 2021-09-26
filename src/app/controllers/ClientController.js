const proModel = require('../models/Product');
class ClientController{

    client(req,res,next){
        res.render('client');
    }
}

module.exports = new ClientController;