const userInfo = document.querySelector('#userInfo');
const userInfoInput = document.querySelectorAll('.profileInput');
const profileSubmit = document.querySelector('#profileSubmit');
const profileUpdateNotice = document.querySelector('.profileUpdateNotice');
const proStatus = document.querySelector('#proStatus');
const changePass = document.querySelector('#changePass');
const Logout = document.querySelector('#Logout');
const proStatusDetail = document.querySelectorAll('.proStatus-detail');
////userInfo
userInfo.addEventListener('click',()=>{
    window.location.href = '/userInfo';
})
proStatus.addEventListener('click',()=>{
    window.location.href = '/userInfo/proStatus';
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
profileSubmit.style.display = "none";
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

///


