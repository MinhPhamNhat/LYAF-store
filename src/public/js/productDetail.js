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

    $(".LYAF-order-section #add-cart button").click(function(){
        const selectedSize = $(".LYAF-infor-detail #size #item.selected")
        const selectedColor = $(".LYAF-infor-detail #color #item.selected")
        if (selectedSize.length && selectedColor.length){
            const productId = this.dataset.productid
            const sizeId = selectedSize[0].dataset.id
            const colorId =  selectedColor[0].dataset.id
            const quantity = $(".LYAF-infor-detail #quantity input").val()
            console.log({productId, colorId, sizeId, quantity})
            fetch(window.location.origin+'/api/addCart?'+ new URLSearchParams({productId, colorId, sizeId, quantity}),{
                method: "GET",
            })
            .then(data=>data.json())
            .then(data=>{
                if (data.code===200){
                    makeCart()
                    $(".LYAF-header .blur-bg").fadeIn(300)
                    $(".LYAF-header .LYAF-cart-box").css("right", "0")
                }
            })
        }else{
            showToast("Not select", "Vui lòng chọn thuộc tính sản phẩm", "warning")
        }
    })

    $()
})

  