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
        res.render('createPro');
    }
    //[POST] /create/done
    createDone(req,res,next){
        const newPro = req.body;
        newPro.proUrl = `test-detail`;
        const newProValue = new proModel({name:newPro.proName,price:newPro.proPrice,origin:newPro.proOrigin,url:newPro.proUrl,sale:newPro.proSaleValue});
        newProValue.save()
              .then(()=>( res.redirect('/')))
              .catch(next)
    }

    delete(req,res,next){
        const proId = req.params.id;
        proModel.delete({id: proId})
                .then(()=>{res.redirect('/')})
                .catch('Delete Fail !');

    }
}

module.exports = new ProductController;