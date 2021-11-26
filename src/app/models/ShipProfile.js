//Import library:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete'); // Require mongoose-delete

//Connect DB:
const ShipProfile = new Schema({
    user: {type: mongoose.Schema.Types.String, ref: 'User'},
    address: {type: mongoose.Schema.Types.String, ref: 'Address'},
    name: {type: mongoose.Schema.Types.String},
    phone: {type: mongoose.Schema.Types.String}
},{
    versionKey: false,
    timestamp:true
});


// Add plugin mongoose-delete:
ShipProfile.plugin(mongooseDelete, { overrideMethods:true, //Không hiện thị field bị soft delete
                                 deletedAt:true   //Thêm 1 key deletedAt
                                });


module.exports = mongoose.model('ShipProfile', ShipProfile);