const proModel = require('../models/Product');
const sizeModel = require('../models/Size');
const ProductDAO = require('../repo/ProductDAO')
const catModel = require('../models/Category');
const BillDAO = require('../repo/BillDAO')
const {parseCart} = require('../../helper/function')
class ManagementController{

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
            catModel.find({})
            .then((catList)=>{
                catList = catList.map((catList) => catList.toObject());
                res.render('property', {catList,sizeList});
            })
        })

        
       
    }
    sizeManager(req,res,next){
        sizeModel.findById(req.body.sizeId).lean().exec()
        .then(
            (data)=>{
                res.status(200).json(data);
            }
        )
    }    
    async billDetail(req, res, next) {
    }
    addsize(req,res,next){
        sizeModel.findById(req.body.addSizeID).lean().exec()
        .then((data)=>{
            console.log(data);
            if(data == null){
                const newsize = new sizeModel({
                    _id:req.body.addSizeID,
                    name:req.body.addSizeName,
                    desc:req.body.addSizeDesc,
                });
                newsize.save()
                .then(()=>{
                    res.status(200).json();
                })
                .catch(()=>{
                    res.status(300).json();
                })
            }
            else{
                res.status(400).json();
            }
        })
        .catch(()=>{
            res.status(500).json()
        })
    } 
    updatesize(req,res,next){

        sizeModel.findByIdAndUpdate(req.body.addSizeID,{
            _id:req.body.addSizeID,
            name:req.body.addSizeName,
            desc:req.body.addSizeDesc,
        }).exec()
        .then((data)=>{
            if(data != null){
                res.status(200).json(data);
            }
            else{
                res.status(400).json();
            }
        })
        .catch(()=>{
            res.status(500).json();
        })
    }   
    deletesize(req,res,next){
        sizeModel.findByIdAndDelete(req.body.addSizeID).exec()
        .then((data)=>{
            if(data !=null){
                res.status(200).json(data);
            }
            else{
                res.status(400).json();
            }
        })
        .catch(()=>{
            res.status(500).json();
        })
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

    async productDetail(req, res, next) {
        const id = req.params.id
        if (id){
            const result = await ProductDAO.findById(id)
            switch (result.code) {
                case 1:
                    console.log(result.data)
                    res.render('ManagerProductDetail', {data: result.data});
                    break;
                case 0:
                    res.render('404');
                    break;
                case -1:
                    console.log(result)
                    res.render('404');
                    break;
              }
        }else{

        }
    }
    categoryManager(req,res,next){
        catModel.findById(req.body.CatId).lean().exec()
        .then(
            (data)=>{
                res.status(200).json(data);
            }
        )
    }
    addcategory(req,res,next){
        catModel.findById(req.body.addCatID).lean().exec()
        .then((data)=>{
            console.log(data);
            if(data == null){
                    const newcat = new catModel({
                        _id:req.body.addCatID,
                        name:req.body.addCatName,
                        parentId:req.body.addCatParent,
                    });
                    newcat.save()
                    .then(()=>{
                        res.status(200).json();
                    })
                    .catch(()=>{
                        res.status(300).json();
                    })
               
            }
            else{
                res.status(400).json();
            }
        })
        .catch(()=>{
            res.status(500).json()
        })
    }
    deletecategory(req,res,next){
        catModel.findByIdAndDelete(req.body.addCatID).exec()
        .then((data)=>{
            if(data !=null){
                res.status(200).json(data);
            }
            else{
                res.status(400).json();
            }
        })
        .catch((err)=>{
            res.status(500).json();
           
        })
        
    }
    updatecategory(req,res,next){
        if(req.body.addCatParent !=''){
            catModel.findByIdAndUpdate(req.body.addCatID,{
                _id:req.body.addCatID,
                name:req.body.addCatName,
                parentId:req.body.addCatParent,
            }).exec()
            .then((data)=>{
                if(data != null){
                    res.status(200).json(data);
                }
                else{
                    res.status(400).json();
                }
            })
            .catch(()=>{
                res.status(500).json();
            })
        }
        else{
            catModel.findByIdAndUpdate(req.body.addCatID,{
                _id:req.body.addCatID,
                name:req.body.addCatName,
                parentId:req.body.addCatParent,
            }).exec()
            .then((data)=>{
                if(data != null){
                    res.status(200).json(data);
                }
                else{
                    res.status(400).json();
                }
            })
            .catch(()=>{
                res.status(500).json();
            })
        }
        
    }
}

// AB dsaasd
module.exports = new ManagementController;