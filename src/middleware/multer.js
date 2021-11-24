const multer = require('multer')


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})

var upload = multer({ storage: storage })

module.exports = upload