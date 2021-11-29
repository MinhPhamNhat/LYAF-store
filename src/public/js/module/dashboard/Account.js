const parseToElements = (obj) => {
    var username = obj._id;
    var name  = obj.name;
    var role ='';
 
    if(obj.role == 'admin'){
        role = 'admin';

    }
    else if(obj.role == 'NVVC'){
        role = 'Nhân viên vận chuyển';
    }
    else if(obj.role == 'NVĐH'){
        role = 'Nhân viên đơn hàng';
    }
    else if(obj.role == 'NVSP'){
        role = 'Nhân viên sản phẩm';
    }
    else{
        role = 'User';
    }
    var email = obj.email||'None'
    var phone = obj.phoneNumber||'None'
    var action = `
      <div class="account-action">
        <a class="btn btn-primary" id="accDetailLink" href="/manager/accountDetail/${obj._id}">Detail</a> 
      </div>
    `
    return {
        username,
        name,
        phone,
        role,
        email,
        action
    };
  };
$(document).ready(()=>{
    fetch(window.location.origin+'/manager/accountManager')
    .then(data=>data.json())
    .then(data=>{
      var accList = data.user.map(_ => {
        console.log(_)
        return parseToElements(_)
      })
      
    
  
      // DATATABLE
      if ($("#accTable")[0]) {
        var columns = [
          {
            title: "UserName",
            data: "username",
          },
          {
            title: "Name",
            data: "name",
          },
          {
            title: "Role",
            data: "role",
          },
          {
            title: "Phone",
            data: "phone",
          },
          {
            title: "Email",
            data: "email",
          },
          {
            title: "Action",
            data: "action",
          },
         
        ];
  
        var t = $("#accTable").DataTable({
          responsive: true,
          data: accList,
          columns,
          autoWidth:false,
          "order": []
        });
  
       
        }
      })
  })

//Event Account:
document.querySelector('#accDetailCancel').addEventListener('click',function(){
    window.location.href="/manager/account";
})
document.querySelector('#accDetailUpdate').addEventListener('click',function(){
      const data = JSON.stringify({
        accDetailID : document.querySelector('#acc-username').value,
        acDetailName : document.querySelector('#acc-name').value,
        accDetailRole: document.querySelector('#acc-role').value,
        accDetailPhone: document.querySelector('#acc-phone').value,
        accDetailEmail: document.querySelector('#acc-email').value,
      });
      fetch(window.location.origin+'/manager/updateaccount',{method:'post',body:data,headers: {
          'Content-Type': 'application/json'
      },})
          .then((data) => {
            if(data.status == 200){
              showToast('Cập nhật Tài Khoản','Cập nhật thành công !');
            }
            else if(data.status ==400){
              showToast('Cập nhật Tài khoản','Cập nhật thất bại !');
            }
            else if(data.status == 500){
              showToast('Cập nhật Tài khoản','Cập nhật thất bại !');
            }
          })
  
  });

  document.querySelector('#accDetailDelete').addEventListener('click',function(){
    const data = JSON.stringify({
      accDetailID : document.querySelector('#acc-username').value,
      
    });
    fetch(window.location.origin+'/manager/deleteaccount',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
          if(data.status == 200){
            window.location.href = '/manager/account';
          }
          else if(data.status == 400){
            showToast('Cập nhật Tài khoản','Cập nhật thất bại !','error');
          }
          else if(data.status == 500){
            showToast('Cập nhật Tài khoản','Cập nhật thất bại !');
          }
        })

});