const userInfo = document.querySelector('#userInfo');
const userInfoInput = document.querySelectorAll('.profileInput');
const profileSubmit = document.querySelector('#profileSubmit');
const profileUpdateNotice = document.querySelector('.profileUpdateNotice');
const proStatus = document.querySelector('#proStatus');
const changePass = document.querySelector('#changePass');
const Logout = document.querySelector('#Logout');
const proStatusDetail = document.querySelectorAll('.proStatus-detail');
const changePassSubmit = document.querySelector('.changePassSubmit');
const oldpass = document.querySelector('#oldpass');
const newpass = document.querySelector('#newpass');
const newpasscheck = document.querySelector('#newpasscheck');
const addressList = document.querySelector('#addressList');
////userInfo
userInfo.addEventListener('click',()=>{
    window.location.href = '/userInfo';
})
proStatus.addEventListener('click',()=>{
    window.location.href = '/userInfo/proStatus';
})
addressList.addEventListener('click',() =>{
    window.location.href='/userInfo/addressList';
})
changePass.addEventListener('click',()=>{
    window.location.href = '/userInfo/changePass';
})
Logout.addEventListener('click',()=>{
    window.location.href = '/logout';
})
for(let i of proStatusDetail){
    i.addEventListener('click',(e)=>{
        window.location.href = '/userInfo/proStatus/proStatusDetail';
    })
    
}
for(let i of userInfoInput){
    $(i).keyup(function() {

        if ($(this).val().length == 0) {
           $('#profileSubmit').hide();
           $('.profileUpdateNotice').show();
        } else {
           $('#profileSubmit').show();
           $('.profileUpdateNotice').hide();
        }
     }).keyup();

}

if(changePassSubmit != null){
    changePassSubmit.addEventListener('click',function(e){
        e.preventDefault();
        const data = JSON.stringify({
            oldpass: oldpass.value,
            newpass: newpass.value,
            newpasscheck: newpasscheck.value
        });
        fetch(window.location.origin+'/userInfo/changePass/done',{method:'post',body:data,headers: {
            'Content-Type': 'application/json'
        },})
            .then((data) => {
                if(data.status == 200){
                    window.location.href = '/';
                }
                else{
                    return data.json();
                }
            })
            .then(data=>{
                showToast('Đổi mật khẩu',data.error);
            })
    });
    
}

//Event add address:
$(document).ready(()=>{
    fetch(window.location.origin+'/api/province')
    .then(data=> data.json())
    .then(data=>{
        // $(".delivery-form #province option").remove()
        const provinces = data.provinces
        $("#addadd-province").append(`<option id="firstselected" value="" selected>Chọn tỉnh/thành</option>`)
        provinces.forEach(_=> {
            $("#addadd-province").append(`<option value="${_._id}">${_.name}</option>`)
        })
    })
    $("#addadd-province").change(()=>{
        const provinceId = $("#addadd-province option:selected").val()
        if (provinceId){
            fetch(window.location.origin+'/api/district/'+provinceId)
            .then(data=> data.json())
            .then(data=>{
                $("#addadd-district option").remove()
                const districts = data.districts
                $("#addadd-district").append(`<option value="" selected>Chọn quận/huyện</option>`)
                districts.forEach(_=> {
                    $("#addadd-district").append(`<option value="${_._id}">${_.name}</option>`)
                })
            })
        }
        else{
            $("#addadd-district option").remove()
        }
    })
    $("#addadd-district").change(()=>{
        const districtId = $("#addadd-district option:selected").val()
        if (districtId){
            fetch(window.location.origin+'/api/ward/'+districtId)
            .then(data=> data.json())
            .then(data=>{
                $("#addadd-ward option").remove()
                const wards = data.wards
                $("#addadd-ward").append(`<option selected>Chọn phường/xã</option>`)
                wards.forEach(_=> {
                    $("#addadd-ward").append(`<option value="${_._id}">${_.name}</option>`)
                })
            })
        }
        else{
            $("#addadd-ward option").remove()
        }
    })

})
if(document.querySelector('#addAddBtn') != null){
    document.querySelector('#addAddBtn').addEventListener('click',function(){
        if(document.querySelector('#addadd-name') && document.querySelector('#addadd-stress').value && document.querySelector('#addadd-province').value && document.querySelector('#addadd-district').value && document.querySelector('#addadd-ward').value && document.querySelector('#addadd-phone').value){
            const data = JSON.stringify({
                name: document.querySelector('#addadd-name').value,
                stress: document.querySelector('#addadd-stress').value,
                province: document.querySelector('#addadd-province').value,
                district: document.querySelector('#addadd-district').value,
                ward: document.querySelector('#addadd-ward').value,
                phone: document.querySelector('#addadd-phone').value,
            });
            fetch(window.location.origin+'/userInfo/addressList/add',{method:'post',body:data,headers: {
                'Content-Type': 'application/json'
            },})
                .then((data) => {
                    if(data.status == 200){
                        return data.json();
                    }
                    else{
                        return data.json();
                    }
                })
                .then(data=>{
                    var addressRow = '';
                    console.log(data);
                    for(let i of data){
                            var row =  `<table class="address-profile forList">
                            <tr id="header" class="countName">
                                <td style="background-color: black;"></td>
                                <td class="icon-trash">
                                    <div id="addressUpdate"><i class="fas fa-marker"></i></div>
                                    <div  id="addressDelete"><i class="fas fa-trash-alt"></i></div>
                                    
                                </td>
                            
                            </tr>
                            <tr>
                                <td><strong>Họ và tên</strong></td>
                                <td>${i.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Địa chỉ</strong></td>
                                <td>${i.address}</td>
                            </tr>
                            <tr>
                                <td><strong>Tỉnh / Thành</strong></td>
                                <td>${i.province.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Quận / Huyện</strong></td>
                                <td>${i.distric.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Phường / Xã</strong></td>
                                <td>${i.ward.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Số điện thoại</strong></td>
                                <td>${i.phone}</td>
                            </tr>
                        </table>`;
                        addressRow+=row;
                    }
                    document.querySelector('#addressHolder').innerHTML = addressRow;
                    showToast('Thêm Địa chỉ','Thêm Thành Công !');
                   
                })
               
        }
        else{
            showToast('Cảnh báo','Có input đang trống !','warning');
        }
    })
  
}

if(document.querySelectorAll('.addressDelete')){
    for(let i of document.querySelectorAll('.addressDelete')){

       i.addEventListener('click',function(){
            console.log(this.dataset.id);
            // const data = JSON.stringify({c
            //     user: 
            // })
        })
    }
}

