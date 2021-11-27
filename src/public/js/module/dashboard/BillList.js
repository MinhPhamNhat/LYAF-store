
$(document).ready(()=>{
    const columns = [
      {
        title: "Mã",
        data: "_id",
      },
      {
        title: "Ngày đặt",
        data: "date",
      },
      {
        title: "Tổng tiền",
        data: "totalPrice",
      },
      {
        title: "Thanh toán",
        data: "alreadyPay",
      },
      {
        title: "Tình trạng",
        data: "state",
      },
      {
        title: "",
        data: "detail",
      },
    ];
    fetch(window.location.origin+'/api/manager/getBills')
    .then(data=>data.json())
    .then(data=>{

       var t = $("#bill-list").DataTable({
          responsive: true,
          data: parseData(data) ,
          columns,
          columnDefs: [{ orderable: false, targets: 0 }],
        });
    })

    
    // var t = $("#bill-list").DataTable({
    //     responsive: true,
    //     data: ,
    //     columns,
    //     columnDefs: [{ orderable: false, targets: 0 }],
    //   });
  })

function parseData(data) {
  const result = data.map(v=>{
    
    return {
      _id: v._id,
      date: new Date(v.date).toLocaleString("vi-VN"),
      totalPrice: (v.totalPrice*1000).toLocaleString('it-IT') +'<u>đ</u>',
      state: billStatestate(v.state),
      alreadyPay: v.alreadyPay?"Đã thanh toán":"Chưa thanh toán",
      detail: `<a href="/manager/bill/detail/${v._id}">Chi tiết</a>`
    }
  })
  return result
}

function billStatestate(state){
  switch(state){// 0: Huỷ đơn hàng ,1: Đang chờ xử lý, 2: Đã xác nhận đơn hàng, 3: Đang vận chuyển, 4: Đã giao hàng
    case 0:
        return "Đã huỷ đơn hàng"
    case 1:
        return "Đang chờ xử lý"
    case 2:
        return "Đã xác nhận đơn"
    case 3:
        return "Đang vận chuyển"
    case 4:
        return "Đã giao hàng"
}}