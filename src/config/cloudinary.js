const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.updoads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, {
            resource_type: "image",
            folder: folder
        }).then((result) => {
            console.log("success", JSON.stringify(result, null ,2))
        }).catch((err)=> {
            console.log("err", JSON.stringify(err, null ,2))
        })
    }) 
}

exports.images = (file, option) => {
    var image = cloudinary.image(file, option)
    return image;
}