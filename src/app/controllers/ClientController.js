
const Color = require('../models/Color')
const Size = require('../models/Size')
const Category = require('../models/Category')
class ClientController{

    async client(req,res,next){
        res.render('home', {user: req.user});
    }

    productDetail(req,res,next){
        res.render('productDetail');
    }

    productCollection(req,res,next){
        res.render('productCollection');
    }
}

module.exports = new ClientController;