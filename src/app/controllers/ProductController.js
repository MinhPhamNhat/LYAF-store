const proModel = require('../models/Product');

class ProductController{

    proManager(req,res,next){
        proModel.find({})
                .then((data) =>{
                    data = data.map((data) => data.toObject());
                    res.render('proManager',{data});
                })
                .catch(next)
    }

    create(req,res,next){
        res.render('proManager', {route: "add"});
    }
    list(req, res, next){
        res.render('proManager', {route: "list"});
    }
    delete(req,res,next){
        const proId = req.params.id;
        proModel.delete({id: proId})
                .then(()=>{res.redirect('/')})
                .catch('Delete Fail !');

    }
}
// AB dsaasd
module.exports = new ProductController;