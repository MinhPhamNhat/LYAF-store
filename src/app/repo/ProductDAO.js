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
    const numberOfProd = await Category.findById(categoryId).select('numberOfProd').exec()
    var id = '' + (numberOfProd||0 + 1)
    while(id.length < codeLength){
        id = '0' + id
    }
    id = categoryId+id
    return id
}

module.exports = {
    createNew: async(payload, {option})=>{
        const prodId = await generateId(payload.generateId)
        return await new Product({
            _id: prodId,
            name: payload.name,
            desc: payload.desc,
            categoryId: payload.categoryId,
            price: payload.price,
            thumbnails: payload.images,
            isSale: option.isSale,
            isNew: option.isNew,
            sale: option.sale,
            amountOfAccess: option.amountOfAccess,
        }).save()
        .then(async (result)=>{
            // Increase number of product in category
            var category = await Category.findById(payload.categoryId).exec()
            category.numberOfProd = category.numberOfProd||0 + 1
            category.save()

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
                message: err.errors
            }
        })
    }
}