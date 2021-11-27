const proModel = require('../models/Product');
const sizeModel = require('../models/Size');
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
    property(req, res, next){
        sizeModel.find({})
        .then((sizeList)=>{
            sizeList = sizeList.map((sizeList) => sizeList.toObject());
            console.log(sizeList);
            res.render('property', {sizeList});
        })
       
    }
    sizeManager(req,res,next){
        sizeModel.findById(req.body._id).lean().exec()
        .then(
            (data)=>{
                res.status(200).json(data);
            }
        )
    }
}
// AB dsaasd
module.exports = new ProductController;