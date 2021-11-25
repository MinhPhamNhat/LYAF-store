
const cloudinary = require('../../config/cloudinary')
const path = require('path')
const fs = require('fs');

exports.getPayload = async (req) => {
  var files =  req.files
  console.log(files.length)
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
