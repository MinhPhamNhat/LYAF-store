//Edit Header:
$(document).ready(()=>{
    makeCart()
    $(".LYAF-header-dropdown").hover(() =>{
        if (!$("#dropdown-action").is(':visible')){
            $("#dropdown-action").show(100)
            $(".LYAF-header-dropdown #btn-dropdown").css("color", "black")
        }
    },function() {
        if ($("#dropdown-action").is(':visible')){
            $("#dropdown-action").hide(100)
            $(".LYAF-header-dropdown #btn-dropdown").css("color", "white")
        }
    })
  
    $(".LYAF-header-search").on('click', () => {
        $(".LYAF-header .blur-bg").fadeIn(300)
        $(".LYAF-header .LYAF-search-box").css("right", "0")
    })
  
    $(".LYAF-search-box-close i, .LYAF-header .blur-bg").on('click', () => {
        $(".LYAF-header .blur-bg").fadeOut(300)
        $(".LYAF-header .LYAF-search-box").css("right", "-500px")
    })
  
    $(".LYAF-header-cart").on('click', () => {
        $(".LYAF-header .blur-bg").fadeIn(300)
        $(".LYAF-header .LYAF-cart-box").css("right", "0")
    })
  
    $(".LYAF-cart-box-close i, .LYAF-header .blur-bg").on('click', () => {
        $(".LYAF-header .blur-bg").fadeOut(300)
        $(".LYAF-header .LYAF-cart-box").css("right", "-500px")
    })

    $(".LYAF-header-account").click(function(){
        if (!$(".LYAF-header-account .LYAF-header-popup").is(':visible'))
        $(".LYAF-header-account .LYAF-header-popup").fadeIn(100)
        else if ($(".LYAF-header-account .LYAF-header-popup").is(':visible'))
        $(".LYAF-header-account .LYAF-header-popup").fadeOut(100)
    })

    $(document).on('click', '.LYAF-cart-product-remove', function(){
        const id = this.dataset.id;
        console.log(id)
        fetch(window.location.origin+'/api/removeCart?id='+id)
        .then(data=>{
            if (data.status == 200)
            makeCart()
            else
            showToast("Cart", "Lấy giỏ hàng thất bại", "error")
        })
    })

    $(".LYAF-cart-pay-btn").click(()=>{
        // localhost:2000/api/checkOut
        fetch(window.location.origin+'/api/checkOut')
        .then(data=>{
            if (data.status === 200){
                window.location.href = '/checkout'
            }else{
                $(".prompt-login-modal").modal("show")
            }
        })
    })
  })


  const makeCart = () => {
    fetch(window.location.origin+'/api/getCart').then(data=>data.json())
    .then(cart=>{
        $(".LYAF-cart-site .LYAF-cart-list .LYAF-cart-product").remove()
        $(".LYAF-cart-site .LYAF-cart-list hr").remove()
        var sum = 0
        cart.forEach(c=>{
            $(".LYAF-cart-site .LYAF-cart-list").append(`
            <hr>
                <div class="LYAF-cart-product">
                    <img src="${c.thumbnail}" class="LYAF-cart-product-thumbnail">
                    <div class="LYAF-cart-product-info">
                        <a href="/product/detail/${c.productId}"><p class="LYAF-cart-product-name font-weight-bold text-uppercase">${c.name}</p></a>
                        <p class="LYAF-cart-option text-uppercase">${c.subProdId}|${c.color.name}|${c.size.name}</p>
                        <div class="LYAF-cart-quant-price">
                            <span class="LYAF-cart-quant">${c.quantity}</span>
                            <p class="LYAF-cart-price text-uppercase">${(c.salePrice*1000*c.quantity).toLocaleString('it-IT')}<u>đ</u></p>
                            ${(c.isSale)?`<p class="LYAF-cart-price text-uppercase true-price">${(c.price*1000*c.quantity).toLocaleString('it-IT')}<u>đ</u></p>`:''}
                        </div>
                        <div class="LYAF-cart-product-remove" data-id="${c.subProdId}">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            `)
            sum += c.salePrice*1000*c.quantity
        })
        $(".LYAF-header-cart .LYAF-no-products").html(cart.length)
        $(".LYAF-cart-sum-list .LYAF-cart-sum-price").html(`${sum.toLocaleString('it-IT')}<u>đ</u>`)
    })
}


const showToast = (title, mess, type = "success", x = 20, y = 20) => {
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

  const showLoading = () => {
    $(".LYAF-loading").fadeIn(300)
  }

  const hideLoading = () => {
    $(".LYAF-loading").fadeOut(300)
  }