const { render } = require('node-sass');
const proModel = require('../models/Product');

class AccessController{

    login(req,res,next){
        res.render('access');
    }
}

module.exports = new AccessController;