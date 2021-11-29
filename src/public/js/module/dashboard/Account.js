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
        <a class="btn btn-primary">Detail</a> 
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