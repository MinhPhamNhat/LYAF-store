const proModel = require('../models/Product');

const Province = require('../models/Province')
const District = require('../models/District')
const Ward = require('../models/Ward')
class ClientController{

    client(req,res,next){
        District.find({provinceCode: "P-79"}).exec((err, data)=>{
            // console.log(data)
        })
        res.render('home');
    }

    productDetail(req,res,next){
        
        res.render('productDetail');
    }

    productCollection(req,res,next){
        
        res.render('productCollection');
    }
}

module.exports = new ClientController;