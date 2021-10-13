const { render } = require('node-sass');
const proModel = require('../models/Product');

class AccessController{

    login(req,res,next){
        res.render('login');
    }
    register(req,res,next){
        res.render('register');
    }
}

module.exports = new AccessController;