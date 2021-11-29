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

const Province = require('../models/Province');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Bill = require('../models/Bill');
const SubProduct = require('../models/SubProduct');
const BillDetail = require('../models/BillDetail');
module.exports = {
    createBill: async (payload, user, cart)=>{
        return Bill({
            user: user._id,
            shipProfile: {
                province: payload.province,
                distric: payload.district,
                ward: payload.ward,
                address: payload.address,
                name: payload.name,
                phone: payload.phone
            },
            state: 1, // 0: Huỷ đơn hàng ,1: Đang chờ xử lý, 2: Đã xác nhận đơn hàng, 3: Đang vận chuyển, 4: Đã giao hàng
            paymentType: payload.payment==="MOMO"?1:0, // 0: COD, 1: MOMO
            alreadyPay: false
        }).save()
        .then(async (data)=>{
            var price = await Promise.all(cart.map(async c=>{
                var subProd = await SubProduct.findById(c.subProdId).populate("productId").exec()
                var price =   (subProd.productId.price-(subProd.productId.price * subProd.productId.sale||0))*c.quantity;
                
                
                await BillDetail({
                    bill: data._id,
                    subProdId: c.subProdId,
                    quantity: c.quantity,
                }).save()
                return price
            }))
            
            var totalPrice = price.reduce((x,y) => x+y, 0);
            data.totalPrice = totalPrice;
            data.save()
            return {
                code: 1,
                data: data._id
            }
        })
        .catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },

    findBillById: async(userId) => {
        const bills =  Bill.find({ user: userId }).lean().exec()
        return bills
    },

    getBillDetail: async (option)=>{
        return await Bill.findOne(option).populate('user').populate('shipProfile.province').populate('shipProfile.distric').populate('shipProfile.ward').lean().exec()
        .then(async (bill) => {
            if (bill){
                const billDetail = await BillDetail.find({ bill: bill._id }).lean().exec()
                bill = {...bill, billDetail}
                return {
                    code: 1,
                    data: bill
                }
            }else{
                return {
                    code: 0,
                    message: "Bill không tồn tại"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
        
    },

    getBills: async(option, userId, limit={}, skip={}, sort={})=>{
        return Bill.find(option).sort({ date: -1 }).skip(skip).limit(limit).lean().exec()
    },

    updateState: async (billId, value)=>{
        return Bill.findOneAndUpdate({_id: billId}, {
            state: value
        }).then(data=>{
            if (data){
                return {
                    code: 1,
                    message: "Đã cập nhật tình trạng đơn"
                }
            }else{
                return {
                    code: 0,
                    message: "Bill không tồn tại"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },

    updatePayment: async (billId, value)=>{
        return Bill.findOneAndUpdate({_id: billId}, {
            alreadyPay: value==0?false:true
        }).then(data=>{
            if (data){
                return {
                    code: 1,
                    message: "Đã cập nhật thanh toán thành " + value==0?"chưa":"đã" + " thanh toán"
                }
            }else{
                return {
                    code: 0,
                    message: "Bill không tồn tại"
                }
            }
        }).catch(err=>{
            return {
                code: -1,
                message: err
            }
        })
    },
}