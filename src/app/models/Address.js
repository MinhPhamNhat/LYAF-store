//Import library:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete'); // Require mongoose-delete

//Connect DB:
const Address = new Schema({
    province: {type: mongoose.Schema.Types.String, ref: 'Province'},
    distric: {type: mongoose.Schema.Types.String, ref: 'District'},
    ward: {type: mongoose.Schema.Types.String, ref: 'Ward'},
    addressNumber: {type: mongoose.Schema.Types.String}
},{
    versionKey: false,
    timestamp:true
});


// Add plugin mongoose-delete:
Address.plugin(mongooseDelete, { overrideMethods:true, //Không hiện thị field bị soft delete
                                 deletedAt:true   //Thêm 1 key deletedAt
                                });


module.exports = mongoose.model('Address', Address);