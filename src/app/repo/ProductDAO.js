// QUY ĐỊNH TRẢ VỀ :
// LUÔN TRẢ VỀ ĐỊNH DẠNG JSON:
// {
//      code: 1,
//      message: "",
//      data: {},
// }
// QUY ĐỊNH property [code]:
// code = 1: Thành công
// code = -1: Lỗi
// code = 0: Không tìm thấy
// QUY ĐỊNH property [message]:
// message = "": Trả về thông báo về quá trình gọi data từ phương thức
// Ví dụ: Nếu không tìm thấY dữ liệU thì message = "Không tìm thấY"
// QUY ĐỊNH property [data]:
// data = {}: Trả về dữ liệu từ phương thức

const Product = require('../models/Product')
const SubProduct = require('../models/SubProduct')
const Category = require('../models/Category')

async function generateId(categoryId, codeLength=5){
    const category = await Category.findById(categoryId).select('numberOfProd').exec()
    var id = '' + ((category.numberOfProd||0) + 1)
    while(id.length < codeLength){
        id = '0' + id
    }
    id = category._id+id
    return id
}

module.exports = {
    createNew: async(payload, option={sale: null, isSale: false, isNew: false, amountOfAccess: 0})=>{
        const prodId = await generateId(payload.categoryId)
        return await new Product({
            _id: prodId,
            name: payload.name,
            desc: payload.desc,
            categoryId: payload.categoryId,
            price: payload.price,
            images: payload.images,
            isSale: option.isSale,
            isNew: option.isNew,
            sale: option.sale,
            amountOfAccess: option.amountOfAccess,
            rating: 0
        }).save()
        .then(async (result)=>{
            // Increase number of product in category
            var category = await Category.findById(payload.categoryId).exec()
            await Category.findByIdAndUpdate(category._id, {numberOfProd: (category.numberOfProd||0)+ 1}).exec()

            // Create new SubProduct
            payload.subProduct.forEach(async (p, i) => {
                await new SubProduct({
                    _id: prodId + '-' + i,
                    productId: prodId,
                    colorId: p.colorId,
                    sizeId: p.sizeId,
                    quantity: p.quantity
                }).save()
            })
            return {
                code: 1,
                data: result
            }
        }).catch((err)=>{
            return {
                code: -1,
                message: err
            }
        })
    },

    getProductsList: async (option, limit={}, skip={}, sort={}) => {
        return Product.find(option).populate({
            path: 'categoryId',
            populate: {
                path: 'parentId'
            }
        }).limit(limit).sort(sort).skip(skip).exec()
        .then(data=>{
            return {
                code: 1,
                data
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            } 
        })
    },

    advancedSearch: async (option, categoryList, limit={}, skip={}, sort={}) => {
        console.log(categoryList)
        return Product.find(option).populate({
            path: 'categoryId',
            populate: {
                path: 'parentId'
            }
        }).limit(limit).sort(sort).skip(skip).exec()
        .then(data=>{
            if (!categoryList){
                return {
                    code: 1,
                    data
                }
            }else{
                var result = []
                data.forEach(item=>{
                    if (categoryList.includes(item.categoryId._id) || categoryList.includes(item.categoryId.parentId?item.categoryId.parentId._id:'')){
                        result.push(item)
                    }
                })
                return {
                    code: 1,
                    data: result
                }
            }
        }).catch(err=>{
            console.log(err)
            return {
                code: -1,
                message: err
            } 
        })
    },

    getMinMaxPriceRange: async () => {
        return await Product.aggregate([{
            $group: {
                _id: null,
                maxPrice: { $max: '$price' },
                minPrice: { $min: '$price' },
            }
        }]).exec();
    },

    findById: async (id) => {
        return Product.findById(id).populate({
            path: 'categoryId',
            populate: {
                path: 'parentId'
            }
        }).exec()
        .then(async (data)=>{
            if (data){
                var subProduct = await SubProduct.find({productId: data._id}).lean()
                .populate('colorId')
                .populate('sizeId').exec()
                var result = {...data.toJSON(), subProduct}
                return {
                    code: 1,
                    data: result
                }
            }else{
                return {
                    code: 0,
                    message: "Notfound"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            } 
        })
    },

    getSubProduct: async (option) => {
        return SubProduct.find(option).populate('colorId').populate('sizeId').exec() 
        .then(data=>{
            if (data.length){
                return {
                    code: 1,
                    data
                }
            }else{
                return {
                    code: 0,
                    message: "Color not found with this product"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },

    getSubProductById: async (id) => {
        return SubProduct.findById(id).lean().populate('productId').populate('colorId').populate('sizeId').exec()   
    },

    updateSubProduct: async (id, payload)=>{
        return SubProduct.findByIdAndUpdate(id, payload).exec()
        .then(data=>{
            if(data){
                return {
                    code: 1,
                    data
                }
            }else{
                return {
                    code: 0,
                    message: "SubProduct not found"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },
    updateProduct: async(id, payload)=> {
        return Product.findByIdAndUpdate(id, payload).exec()
        .then(data=>{
            if(data){
                return {
                    code: 1,
                    data
                }
            }else{
                return {
                    code: 0,
                    message: "SubProduct not found"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },

    addUpdateAndDeleteSubProduct: async (productId, subList) => {
        const product = await Product.findById(productId).exec()
        if (product){
            var count = product.subProductCount
            await Promise.all(subList.map( s => {
                return SubProduct.findOneAndUpdate({productId, colorId: s.colorId, sizeId: s.sizeId}, {quantity: s.quantity}).exec()
                .then(subProd=>{
                    if (!subProd){
                        var newSub = SubProduct({
                            _id: product._id + '-' + count,
                            productId, 
                            colorId: s.colorId, 
                            sizeId: s.sizeId,
                            quantity: s.quantity
                        }).save()
                        count += 1
                        return newSub
                    }
                    return subProd
                }) 
            }))
            product.subProductCount = count
            await product.save()
            const subProdList = await SubProduct.find({productId}).populate('colorId').populate('sizeId').exec()
            const updateList = await Promise.all(subProdList.map(async s=>{
                const value = subList.find(v=> v.colorId === s.colorId._id && v.sizeId === s.sizeId._id)
                if (!value){
                    await SubProduct.findByIdAndDelete(s._id).exec()
                    return undefined
                }else{
                    return s
                }
            }))
            return {
                code: 1,
                data: updateList.filter(_ => _ !== undefined)
            }
        }else{
            return {
                code: 0,
                message: "Product not found"
            }
        }
    },

    removeProduct: async (id)=>{
        return Product.delete({_id: id}).exec()
        .then(data=>{
            if(data){
                console.log(data)
                return {
                    code: 1,
                    data
                }
            }else{
                return {
                    code: 0,
                    message: "Product not found"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })

    }
}