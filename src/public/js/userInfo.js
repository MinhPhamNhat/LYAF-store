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


