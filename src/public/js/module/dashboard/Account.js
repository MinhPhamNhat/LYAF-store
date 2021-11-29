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
    return {
        username,
        name,
        role,
    };
  };
$(document).ready(()=>{
    fetch(window.location.origin+'/manager/accountManager')
    .then(data=>data.json())
    .then(data=>{
      var accList = data.user.map(_ => {
        console.log(new Date(_.date).toLocaleString())
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