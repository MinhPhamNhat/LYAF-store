
const cloudinary = require('../../config/cloudinary')
const path = require('path')
const ProductDAO = require('../../app/repo/ProductDAO')
const fs = require('fs');

exports.getPayload = async (req) => {
  var files =  req.files
  if (files.length < 5){
      return {code: 0, message: "Vui lòng cung cấp nhiều hơn 5 hình ảnh"}
  }
  var isGood = true
  var images = await Promise.all(files.map(async (f)=>{
    var result = await cloudinary.uploads(f.path, "product")
    if (fs.existsSync(path.join(__dirname, "../../uploads/"+f.filename)))
    fs.unlinkSync(path.join(__dirname, "../../uploads/"+f.filename))
    if (result.code === 0){
      isGood = false
    }else{
      var url = cloudinary.url(result.public_id+'.jpg', {aspect_ratio: "1", background: "auto", crop: "pad"})
      return url
    }
  }))
  var subProduct = await Promise.all(req.body.subProduct.map(s => JSON.parse(s)))
  if (isGood){
    return {code: 1, data: {...req.body, subProduct, images}}
  }else{
    return {code: -1, message: "Đã có lỗi khi tạo sản phẩm. Vui lòng thử lại"}
  }
}
exports.addCart = (cart, {newProduct, quantity}) => {
  if (newProduct){
    var flag = false
    cart.forEach((v,i)=>{
      if (v.subProdId === newProduct._id){
        flag = true
        cart[i].quantity += quantity
      }
    })

    if(!flag){
      cart.push({
        subProdId: newProduct._id,
        quantity
      })
    }
  }
  return cart
}

exports.parseCart = async (cart) => {
  if(cart && cart.length){
    var myCart = await Promise.all(cart.map(async (c) =>{
      try{
        var subProduct = await ProductDAO.getSubProductById(c.subProdId)
        var returnSubProduct = {
          subProdId: subProduct._id,
          productId: subProduct.productId._id,
          thumbnail: subProduct.productId.images[0],
          name: subProduct.productId.name,
          price: subProduct.productId.price,
          color: subProduct.colorId,
          size: subProduct.sizeId,
          isSale: subProduct.productId.isSale,
          sale: subProduct.productId.sale,
          quantity: c.quantity
        }
        return returnSubProduct
      }catch{
        return null
      }
    }))
    return myCart.filter(n => n)
  }
  return []
  
}
