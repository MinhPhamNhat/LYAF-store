//Import library:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete'); // Require mongoose-delete

//Connect DB:
const Bill = new Schema({
    _id: {type: mongoose.Schema.Types.String},
    user: {type: mongoose.Schema.Types.String, ref: 'User'},
    shipProfile: {
        address: {type: mongoose.Schema.Types.String, ref: 'Address'},
        name: {type: mongoose.Schema.Types.String},
        phone: {type: mongoose.Schema.Types.String}
    },
    state: {type: mongoose.Schema.Types.Number, enum: [0, 1, 2, 3, 4]}, // 0: Huỷ đơn hàng ,1: Đang chờ xử lý, 2: Đã xác nhận đơn hàng, 3: Đang vận chuyển, 4: Đã giao hàng
    paymentType: {type: mongoose.Schema.Types.Number, enum: [0, 1]}, // 0: COD, 1: MOMO
    alreadyPay: {type: mongoose.Schema.Types.Boolean},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()}
},{
    versionKey: false,
    timestamp:true
});


// Add plugin mongoose-delete:
Bill.plugin(mongooseDelete, { overrideMethods:true, //Không hiện thị field bị soft delete
                                 deletedAt:true   //Thêm 1 key deletedAt
                                });


module.exports = mongoose.model('Bill', Bill);