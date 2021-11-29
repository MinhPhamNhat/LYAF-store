const proModel = require('../models/Product');
const sizeModel = require('../models/Size');
const ProductDAO = require('../repo/ProductDAO')
const catModel = require('../models/Category');
const colorModel = require('../models/Color');
const BillDAO = require('../repo/BillDAO');
const cloudinary = require('../../config/cloudinary');
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
            catModel.find({}).populate('parentId')
            .then((catList)=>{
                catList = catList.map((catList) => catList.toObject());
                colorModel.find({})
                    .then((colorList)=>{
                        colorList = colorList.map((colorList) => colorList.toObject());
                        res.render('property', {sizeList,colorList,catList});
                    })
              
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
    addsize(req,res,next){
        sizeModel.findById(req.body.addSizeID).lean().exec()
        .then((data)=>{
            if(data == null){
                const newsize = new sizeModel({
                    _id:req.body.addSizeID,
                    name:req.body.addSizeName,
                    desc:req.body.addSizeDesc,
                });
                newsize.save()
                .then(()=>{
                    sizeModel.find({})
                    .then((data)=>{
                        data = data.map(data=>data.toObject());
                        res.status(200).json(data);
                    })
                   
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
                sizeModel.find({})
                .then((data)=>{
                    data = data.map(data=>data.toObject());
                    res.status(200).json(data);
                })
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
                sizeModel.find({})
                .then((data)=>{
                    data = data.map(data=>data.toObject());
                    res.status(200).json(data);
                })
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
                    res.render('ManagerProductDetail', {data: result.data});
                    break;
                case 0:
                    res.render('404');
                    break;
                case -1:
                    res.render('404');
                    break;
              }
        }else{

        }
    }
    categoryParent(req,res,next){
        catModel.find({}).populate('parentId')
        .then(data=>{
            data = data.map((data)=>data.toObject());
            return res.status(200).json(data);
        })
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
            if(data == null){
                    const newcat = new catModel({
                        _id:req.body.addCatID,
                        name:req.body.addCatName,
                        parentId:req.body.addCatParent,
                    });
                    newcat.save()
                    .then(()=>{
                        catModel.find({}).populate('parentId')
                        .then((data)=>{
                            data = data.map(data=>data.toObject());
                            res.status(200).json(data);
                        })
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
                catModel.find({}).populate('parentId')
                        .then((data)=>{
                            data = data.map(data=>data.toObject());
                            res.status(200).json(data);
                        })
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
                    catModel.find({}).populate('parentId')
                        .then((data)=>{
                            data = data.map(data=>data.toObject());
                            res.status(200).json(data);
                        })
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
    colorManager(req,res,next){
        colorModel.findById(req.body.addColorID).lean().exec()
        .then(
            (data)=>{
                res.status(200).json(data);
            }
        )
    }
    async addcolor(req,res,next){
        var file = req.file;
        var upload = await cloudinary.uploads(file.path,'color');
        colorModel.findById(req.body.colorId).exec()
        .then((data)=>{
            if(data != null){
                res.status(400).json();
            }
            else{
                const newcolor = new colorModel({
                    _id:req.body.colorId,
                    name: req.body.colorName,
                    thumbnail:upload.url,
                })
                newcolor.save()
                .then((data)=>{
                    if(data !=null){
                        colorModel.find({})
                        .then((data)=>{
                            data = data.map(data=>data.toObject());
                            res.status(200).json(data);
                        })
                    }
                    else{
                        rss.status(400).json();
                    }
                   
                })
                .catch(()=>{
                    res.status(500).json();
                })
            }
        })
        .catch(()=>{
            res.status(500).json();
        })
    }
    deletecolor(req,res,next){
        colorModel.findByIdAndDelete(req.body.colorId).exec()
        .then((data)=>{
            if(data !=null){
                colorModel.find({})
                .then((data)=>{
                    data = data.map(data=>data.toObject());
                    res.status(200).json(data);
                })
            }
            else{
                res.status(400).json();
            }
        })
        .catch(()=>{
            res.status(500).json();
        });
    }
    async updatecolor(req,res,next){
        var upload = await cloudinary.uploads(req.file.path,'color');
        colorModel.findByIdAndUpdate(req.body.colorId,{
            _id:req.body.colorId,
            name:req.body.colorName,
            thumbnail:upload.url,
        })
        .exec()
        .then((data) =>{
            if(data !=null){
                colorModel.find({})
                .then((data)=>{
                    data = data.map(data=>data.toObject());
                    res.status(200).json(data);
                })
            }
            else{
                res.status(400).json();
            }
        })
        .catch(() =>{
            res.status(500).json();
        })
    }
}

// AB dsaasd
module.exports = new ManagementController;