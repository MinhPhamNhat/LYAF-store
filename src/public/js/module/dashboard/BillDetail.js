$(document).ready(()=>{
    $("#confirm-bill").click(function(){
        const id = this.dataset.id
        console.log(id)
        fetch(window.location.origin + '/api/manager/confirmBill',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        }).then(data=> data.json())
        .then(data=>{
            if (data.code===200){
                window.location.reload()
            }else{
                showToast("Xác nhận đơn hàng", data.message, "error")
            }
        })
    })
})