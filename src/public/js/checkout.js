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
        fetch(window.location.origin+'/checkout/showAddress',{method:'post'})
            .then((data) => {
                if(data.status == 200){
                    return data.json();
                }
                else{
                    showToast('Hiện thi Danh sách Địa chỉ','Hiện Thị Thất Bại !','error');
                }
            })
            .then(data=>{
                var profileList = '';
                for( let i of data){
                    var row = `<table class="forShowAddress" data-id="${i._id}">
                            <tr id="header" class="countName">
                                <td id="tempborder"></td>
                                <td class="icon-trash">
                                    
                                </td>
                            
                            </tr>
                            <tr>
                                <td><strong>Họ và tên</strong></td>
                                <td id="tdname">${i.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Địa chỉ</strong></td>
                                <td id="tdaddress">${i.address}</td>
                            </tr>
                            <tr>
                                <td><strong>Tỉnh / Thành</strong></td>
                                <td id="tdprovince">${i.province.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Quận / Huyện</strong></td>
                                <td id="tddistrict">${i.distric.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Phường / Xã</strong></td>
                                <td id="tdward">${i.ward.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Số điện thoại</strong></td>
                                <td id="tdphone">${i.phone}</td>
                            </tr>

                        </table>`;
                        profileList+=row;
                       
                }   
                document.querySelector('.showProfileHere').innerHTML = profileList;
                showToast('Hiện thi danh sách địa chỉ','Hiện Thị Thành Công !');
                $(".select-profile-modal").modal("show")
            })

        
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

console.log(document.querySelectorAll('.forShowAddress'))
// for(let i of document.querySelectorAll('.forShowAddress')){
//         i.addEventListener('click',function(){
//             console.log('OK');
//         })
//     }
