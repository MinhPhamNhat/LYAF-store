//Import library:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete'); // Require mongoose-delete

//Connect DB:
const Product = new Schema({
    name:{type:String},
    price:{type:String},
    origin:{type:String},
    sale:{type:String},
    url:{type:String},
},{
    versionKey: false,
    timestamp:true
});


// Add plugin mongoose-delete:
Product.plugin(mongooseDelete, { overrideMethods:true, //Không hiện thị field bị soft delete
                                 deletedAt:true   //Thêm 1 key deletedAt
                                });


module.exports = mongoose.model('Product',Product);