$(document).ready(()=>{
    fetch(window.location.origin+'/api/province')
    .then(data=> data.json())
    .then(data=>{
        $(".delivery-form #province option").remove()
        const provinces = data.provinces
        $(".delivery-form #province").append(`<option selected>Chọn tỉnh/thành</option>`)
        provinces.forEach(_=> {
            $(".delivery-form #province").append(`<option value="${_._id}">${_.name}</option>`)
        })
    })
    $(".delivery-form #province").change(()=>{
        const provinceId = $(".delivery-form #province option:selected").val()
        if (provinceId){
            fetch(window.location.origin+'/api/district/'+provinceId)
            .then(data=> data.json())
            .then(data=>{
                $(".delivery-form #district option").remove()
                const districts = data.districts
                $(".delivery-form #district").append(`<option selected>Chọn quận/huyện</option>`)
                districts.forEach(_=> {
                    $(".delivery-form #district").append(`<option value="${_._id}">${_.name}</option>`)
                })
            })
        }
    })
    
    $(".delivery-form #district").change(()=>{
        const districtId = $(".delivery-form #district option:selected").val()
        if (districtId){
            fetch(window.location.origin+'/api/ward/'+districtId)
            .then(data=> data.json())
            .then(data=>{
                $(".delivery-form #ward option").remove()
                const wards = data.wards
                $(".delivery-form #ward").append(`<option selected>Chọn phường/xã</option>`)
                wards.forEach(_=> {
                    $(".delivery-form #ward").append(`<option value="${_._id}">${_.name}</option>`)
                })
            })
        }
    })
    $(".payment-option .radio-selection").change(function(){
        $(".payment-option .payment-desc").hide()
        $(this).parent().parent().find(".payment-desc").show()
    })

    $(".pick-a-profile").click(()=>{
        $(".select-profile-modal").modal("show")
    })

    $(".go-checkout").click((e)=>{
        e.preventDefault();

        const name = $('.checkout-form #name').val();
        const phone = $('.checkout-form #phone').val();
        const address = $('.checkout-form #address').val();
        const province = $('.checkout-form #province').val();
        const district = $('.checkout-form #district').val();
        const ward = $('.checkout-form #ward').val();
        const payment = $('.checkout-form input[name=payment]:checked').val();
        
        
        fetch(window.location.origin+'/api/checkout',{
            method: "POST",
            body: new URLSearchParams({name, phone, address, province, district, ward, payment})
        }).then(data=> data.json())
        .then(data=> {
            if (data.code===200){
                window.location.href = '/'
            }else if (data.errors){
                const err = data.errors
                for (var prop in err) {
                    showToast(err[prop].param, err[prop].msg, "error")
                    break;
                }
            }else{
                showToast("Thanh toán", data.message , "error")
            }
        })
    })
})