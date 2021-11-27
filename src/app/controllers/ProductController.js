const proModel = require('../models/Product');
const sizeModel = require('../models/Size');

const BillDAO = require('../repo/BillDAO')
const {parseCart} = require('../../helper/function')
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
    async detail(req, res, next) {
        const billId = req.params.id
        const result = await BillDAO.getBillDetail({_id: billId})
        switch (result.code) {
            case 1:
                result.data.billDetail = await parseCart(result.data.billDetail)
                const parsedCart = result.data.billDetail
                const truePrice = parsedCart.reduce((x,y) => x + y.price*y.quantity, 0);
                const salePrice = truePrice - parsedCart.reduce((x,y) => x + y.salePrice*y.quantity, 0);
                const tempPrice = truePrice - salePrice
                const deliveryPrice = (tempPrice - salePrice) > 500 ? 0 : 50; 
                const totalPrice = tempPrice - salePrice + deliveryPrice
                res.render('billDetail', {route: "billDetail", header: false, user: req.user, data: result.data, salePrice, deliveryPrice, tempPrice, totalPrice});
                break;
            case 0:
                res.render('404');
                break;
            case -1:
                console.log(result)
                res.render('404');
                break;
          }
    }
}
// AB dsaasd
module.exports = new ProductController;