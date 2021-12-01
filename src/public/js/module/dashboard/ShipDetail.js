$(document).ready(()=>{
    $(".confirm-delivery").click(function(){
        const id = this.dataset.id
        console.log(id)
        showLoading()
        fetch(window.location.origin+'/api/manager/confirmDelivery',{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.code === 200){
                showToast("Xác nhận giao hàng thành công", data.message)
            }else{
                showToast("Xác nhận giao hàng thành công", data.message, "error")
            }
            hideLoading()
        }).catch(err=>{
            hideLoading()
            
            showToast("Xác nhận vận chuyển ", err, "error")
        })
    })

    $(".confirm-success").click(function(){
        const id = this.dataset.id
        console.log(id)
        showLoading()
        fetch(window.location.origin+'/api/manager/confirmSuccessDelivery',{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.code === 200){
                $(".bill-infor b").text("Đã giao hàng")
                showToast("Xác nhận giao hàng thành công", data.message)
            }else{
                showToast("Xác nhận giao hàng thành công", data.message, "error")
            }
            hideLoading()
        }).catch(err=>{
            hideLoading()
            
            showToast("Xác nhận vận chuyển ", err, "error")
        })
    })
})