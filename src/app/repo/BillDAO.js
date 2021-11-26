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
        .then(data=>{
            cart.forEach(async c=>{
                await BillDetail({
                    bill: data._id,
                    subProdId: c.subProdId,
                    quantity: c.quantity,
                }).save()
            })
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
    }
}