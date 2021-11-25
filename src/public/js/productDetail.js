
$(document).ready(()=>{
    $('.xzoom, .xzoom-gallery').xzoom({
        position: 'lens', 
        sourceClass: 'xzoom-hidden',
        defaultScale: -0.5,
    });

    $(document).on('click', ".LYAF-infor-detail #color #item", function(){
        if (!$(this).hasClass("selected")){
            $(".LYAF-infor-detail #color #item").removeClass("selected")
            $(this).addClass("selected")
        }
        const colorId = this.dataset.id
        const productId = this.dataset.productid
        fetch(window.location.origin+'/api/product/getSub?'+ new URLSearchParams({productId, colorId}),{
            method: "GET",
        }).then(data=>data.json())
        .then(data=>{
            if (data.code===200){
                $(".LYAF-infor-detail #size #item").remove()
                $(".LYAF-infor-detail #stock span").remove()
                const subProduct = data.data
                subProduct.forEach(_ => {
                    $(".LYAF-infor-detail #size .warpper").append(`
                        <div id="item" data-id="${_.sizeId._id}" data-colorid="${_.colorId._id}" data-productid="${_.productId}"><span>${_.sizeId.name}</span></div>
                    `)
                })
            }else{
                showToast("Color", data.message, "error")
            }
        }).catch(err=>{showToast("Color", err, "error")})
    })

    $(document).on('click', ".LYAF-infor-detail #size #item", function(){
        const sizeId = this.dataset.id
        const colorId = this.dataset.colorid
        const productId = this.dataset.productid
        if (colorId){
            if (!$(this).hasClass("selected")){
                $(".LYAF-infor-detail #stock span").remove()
                $(".LYAF-infor-detail #size #item").removeClass("selected")
                $(this).addClass("selected")
            }
            fetch(window.location.origin+'/api/product/getSub?'+ new URLSearchParams({productId, colorId, sizeId}),{
                method: "GET",
            }).then(data=>data.json())
            .then(data=>{
                if (data.code===200){
                    const subProduct = data.data[0]
                    $(".LYAF-infor-detail #stock").append(`<span>Còn lại <span id="number">${subProduct.quantity}</span> sản phẩm</span>`)
                }else{
                    showToast("Size", data.message, "error")
                }
            }).catch(err=>{showToast("Size", err, "error")})
        }else{
            showToast("Size", "Vui lòng chọn màu sắc trước", "warning")
        }
    })
})


var showToast = (title, mess, type = "success", x = 20, y = 20) => {
    var toastNum = $(".toast").length
    var typeVal = {
        "warning": `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`,
        "error": `<i class="fa fa-exclamation" aria-hidden="true"></i>`,
        "noti": `<i class="fa fa-bell" aria-hidden="true"></i>`,
        "success": `<i class="fa fa-check" aria-hidden="true"></i>`
    }
    var color = {
        "warning": `rgb(254, 255, 193)`,
        "error": `rgb(255, 193, 193)`,
        "success": `rgb(200, 255, 193)`
    }
    var tag =
        `<div class="toastt toastt-${toastNum + 1}"  id="myToast" style="background-color: ${color[type]}; position: fixed; bottom: ${y}px; right: ${x}px; z-index: 100 !important">
                <div class="toast-header">
                    <div style="margin-right: 20px">${typeVal[type]}</div><strong class="mr-auto">${title}</strong>
  
                </div>
                <div class="toast-body" style="margin: 10px;">
                    <div>${mess}</div>
                </div>
            </div>`
  
    $("body").append(tag)
    $(`.toastt-${toastNum + 1}`).show(3000);
    setTimeout(() => {
        $(`.toastt-${toastNum + 1}`).hide(300)
        setTimeout(()=>{
            $(`.toastt-${toastNum + 1}`).remove()
        }, 300)
    }, 4000)
  }
  