const proModel = require('../models/Product');

class ProductController{

    proManager(req,res,next){
        proModel.find({})
                .then((data) =>{
                    data = data.map((data) => data.toObject());
                    res.render('proManager',{data, header: false});
                })
                .catch(next)
    }

    create(req,res,next){
        res.render('proManager', {route: "add", header: false});
    }
    
    list(req, res, next){
        res.render('proManager', {route: "list", header: false});
    }
    
    bill(req, res, next){
        res.render('proManager', {route: "bill", header: false});
    }
}
// AB dsaasd
module.exports = new ProductController;