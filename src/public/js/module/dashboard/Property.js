   //selecting all required elements
   const dropArea = document.querySelector(".drag-area");
   const dragText = document.querySelector(".drag-area header");
   const dropBtn = document.querySelector(" .drag-area button");
   const input = document.querySelector(" .drag-area input");
   let file; //this is a global variable and we'll use it inside multiple functions
   
  
   
   
   //If user Drag File Over DropArea
   document.querySelector(".drag-area").addEventListener("dragover", (event)=>{
     event.preventDefault(); //preventing from default behaviour
     document.querySelector(".drag-area").classList.add("active");
     document.querySelector(".drag-area header").textContent = "Release to Upload File";
   });
   
   //If user leave dragged File from DropArea
   document.querySelector(".drag-area").addEventListener("dragleave", ()=>{
    document.querySelector(".drag-area").classList.remove("active");
    document.querySelector(".drag-area header").textContent = "Drag & Drop to Upload File";
   });
   
   //If user drop File on DropArea
   document.querySelector(".drag-area").addEventListener("drop", (event)=>{
     event.preventDefault(); //preventing from default behaviour
     //getting user select file and [0] this means if user select multiple files then we'll select only the first one
     file = event.dataTransfer.files[0];
     showFile(); //calling function
   });
////Event Color-Image:

document.querySelector('.drag-area').addEventListener('click',function(){
  if(document.querySelector('.drag-area img') !=null){
    document.querySelector(".drag-area").classList.remove("active");
      document.querySelector('.drag-area').innerHTML = '<div class="icon"><i class="fas fa-cloud-upload-alt"></i></div><header>Drag & Drop A Image Here</header><span>OR</span><button>Upload Image</button><input id="inputfile" type="file" hidden>';
      
  }
  else{
    document.querySelector(" .drag-area button").onclick = ()=>{
      document.querySelector(" .drag-area input").click(); //if user click on the button then the input also clicked
     }
     
     document.querySelector(" .drag-area input").addEventListener("change", function(){
       //getting user select file and [0] this means if user select multiple files then we'll select only the first one
       file = this.files[0];
       document.querySelector(".drag-area").classList.add("active");
       showFile(); //calling function
     });
  }
  
})
   function showFile(){
     let fileType = file.type; //getting selected file type
     let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
     if(validExtensions.includes(fileType)){ //if user selected file is an image file
       let fileReader = new FileReader(); //creating new FileReader object
       fileReader.onload = ()=>{
         let fileURL = fileReader.result; //passing user file source in fileURL variable
         let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
         document.querySelector(".drag-area").innerHTML = imgTag; //adding that created img tag inside dropArea container
       }
       fileReader.readAsDataURL(file);
     }else{
       alert("This is not an Image File!");
       document.querySelector(".drag-area").classList.remove("active");
       document.querySelector(".drag-area header").textContent = "Drag & Drop to Upload File";
     }
   }

   const urlToObject = async (url, name) => {
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };

///////Event Size:
const sizeTable = document.querySelector('.body-half-screen-size');
const sizeRow = document.querySelectorAll('.body-half-screen-size tr');
const updateSize = document.querySelector('#update-size-btn');
const deleteSize = document.querySelector('#delete-size-btn');
const addSize = document.querySelector('#add-size-btn');
const cancelSize = document.querySelector('#cancel-size-btn');
const propertytitle = document.querySelector('.propery-title');
const addSizeID = document.querySelector('#add-size-input-id');
const addSizeName = document.querySelector('#add-size-input-name');
const addSizeDesc = document.querySelector('#add-size-input-description');
const clickRowSize = function(){
  for(let i of document.querySelectorAll('.body-half-screen-size tr')){
    i.addEventListener('click',function(){
      const data = JSON.stringify({
        sizeId : this.dataset.id,
        sizeName: this.dataset.id,
        sizeDesc: this.dataset.desc,
    });
    fetch(window.location.origin+'/manager/sizeManager',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
                return data.json();
                
            }
        })
        .then(data=>{
           
            updateSize.style.display = "block";
            deleteSize.style.display = "block";
            cancelSize.style.display = "block";
            propertytitle.style.display = "none";
            addSize.style.display = "none";
            addSizeID.value = data._id;
            addSizeID.setAttribute('disabled','disabled');
            addSizeName.value = data.name;
            addSizeDesc.value = data.desc;
          
        })
      
    });
      
  
  }
}
clickRowSize();

cancelSize.addEventListener('click',function(){
  updateSize.style.display = "none";
  deleteSize.style.display = "none";
  cancelSize.style.display = "none";
  propertytitle.style.display = "block";
  addSize.style.display = "block";
  addSizeID.removeAttribute("disabled");
})
addSize.addEventListener('click',function(){

  if(addSizeID.value ==  '' || addSizeName.value == '' || addSizeDesc.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const data = JSON.stringify({
      addSizeID : addSizeID.value,
      addSizeName : addSizeName.value,
      addSizeDesc : addSizeDesc.value,
    });
    showLoading()
    fetch(window.location.origin+'/manager/addsize',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
             
                
            }
            else if(data.status == 300){
              showToast('Thêm Size','Thêm Thất Bại !','error');
            }else if (data.status === 500){
              showToast('Thêm Size', 'Mã size không hợp lệ')
            }
            else{
              showToast('Thêm Size','Size đã tồn tại','error');
            }
            hideLoading()
          })
          .then(data=>{
            var sizerow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-desc="'+i.desc+'">'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i.desc+'</td>'+
                  '</tr>'
              sizerow+=row;
            } 
            sizeTable.innerHTML = sizerow;
            clickRowSize();
            showToast('Thêm Size','Thêm Thành Công');
            hideLoading()
          })
  }

});

updateSize.addEventListener('click',function(){
  if(addSizeID.value ==  '' || addSizeName.value == '' || addSizeDesc.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const data = JSON.stringify({
      addSizeID : addSizeID.value,
      addSizeName : addSizeName.value,
      addSizeDesc : addSizeDesc.value,
    });
    showLoading()
    fetch(window.location.origin+'/manager/updatesize',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Size không tồn tại','Cập Nhật Thất Bại !','error');
            }
            else{
              showToast('Cập nhật Size','Cập Nhật thất bại !','error');
            }
            hideLoading()
          })
          .then(data=>{
            var sizerow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-desc="'+i.desc+'">'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i.desc+'</td>'+
                  '</tr>'
              sizerow+=row;
            } 
            sizeTable.innerHTML = sizerow;
            clickRowSize();
            showToast('Cập nhật Size','Cập nhật thành công');
            hideLoading()
          })
  }
  
});

const removeSize = () => {
  const data = JSON.stringify({
    addSizeID : addSizeID.value,
    addSizeName : addSizeName.value,
    addSizeDesc : addSizeDesc.value,
  });
  showLoading()
  fetch(window.location.origin+'/manager/deletesize',{method:'post',body:data,headers: {
      'Content-Type': 'application/json'
  },})
      .then((data) => {
          if(data.status == 200){
            return data.json();
              
          }else if (data.status === 300){
            showToast('Xóa Size','Bạn không thể xoá size này vì có sản phẩm thuộc size này','error');
          }
          else if(data.status == 400){
            showToast('Xóa Size','Size vốn không tồn tại','error');
          }
          else{
            showToast('Xóa Size','Xóa thất bại !','error');
          }
          hideLoading()
        })
        .then(data=>{
          var sizerow = '';
          for(let i of data){
            var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-desc="'+i.desc+'">'+
                    '<td>'+i._id+'</td>'+
                    '<td>'+i._id+'</td>'+
                    '<td>'+i.desc+'</td>'+
                '</tr>'
            sizerow+=row;
          } 
          sizeTable.innerHTML = sizerow;
          clickRowSize();
          showToast('Xóa Size','Xóa Thành Công');
          hideLoading()
        })
}

deleteSize.addEventListener('click',function(){
  if(addSizeID.value ==  '' || addSizeName.value == '' || addSizeDesc.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    $(".property-confirm-modal .modal-title").html('Xoá size')
    $(".property-confirm-modal .modal-body").html(`Bạn có muốn xoá size <b>${addSizeName.value}</b>`)
    $(".property-confirm-modal .confirm").attr("data-property", "size")
    $(".property-confirm-modal .confirm").attr("data-id", addSizeID.value)
    $(".property-confirm-modal").modal("show")
  }
  
});

/////
////Event Category:
const CatTable = document.querySelector('.body-half-screen-cat');
const sizeRowCat = document.querySelectorAll('#catTable tr');
const updateCat = document.querySelector('#update-category-btn');
const deleteCat = document.querySelector('#delete-category-btn');
const addCat = document.querySelector('#add-category-btn');
const cancelCat = document.querySelector('#cancel-category-btn');
const propertytitleCat = document.querySelector('.propery-title-category');
const addCatID = document.querySelector('#add-category-input-id');
const addCatName = document.querySelector('#add-category-input-name');
const addCatParent = document.querySelector('#add-category-input-parent');
$( document ).ready(function() {
  
  fetch(window.location.origin+'/manager/categoryParent',{method:'post'})
    .then((data) => {
        if(data.status == 200){
          return data.json();
        }
      })
      .then(data =>{
        var parentrow = '';
        for(let i of data){
          if(i.parentId ==null){
            var row =  '<option value="'+i._id+'">'+i.name+'</option>';
            parentrow+=row;
          }
         
        }
        parentrow += '<option value="'+''+'">'+'Không ParentId'+'</option>';
        document.querySelector('#add-category-input-parent').innerHTML = parentrow;
      })
});

const clickRowCat = function(){
  for(let i of document.querySelectorAll('#catTable tr')){
    i.addEventListener('click',function(){
      const data = JSON.stringify({
        CatId : this.dataset.id,
        CatName: this.dataset.name,
        CatParent: this.dataset.parentId,
    });
    fetch(window.location.origin+'/manager/categoryManager',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
                return data.json();
                
            }
        })
        .then(data=>{
           
            updateCat.style.display = "block";
            deleteCat.style.display = "block";
            cancelCat.style.display = "block";
            propertytitleCat.style.display = "none";
            addCat.style.display = "none";
            addCatID.value = data._id;
            addCatName.value = data.name;
            addCatParent.value = data.parentId;
            addCatID.setAttribute('disabled','disabled');
            addCatParent.setAttribute('disabled','disabled');
          
        })
      
    });
      
  
  }
}

clickRowCat();

cancelCat.addEventListener('click',function(){
  updateCat.style.display = "none";
  deleteCat.style.display = "none";
  cancelCat.style.display = "none";
  propertytitleCat.style.display = "block";
  addCat.style.display = "block";
  addCatID.removeAttribute('disabled')
  addCatParent.removeAttribute("disabled");
})
addCat.addEventListener('click',function(){

  if(addCatID.value ==  '' || addCatName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const data = JSON.stringify({
      addCatID : addCatID.value,
      addCatName : addCatName.value,
      addCatParent : addCatParent.value,
    });
    showLoading()
    fetch(window.location.origin+'/manager/addcategory',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 300){
              showToast('Thêm Category','Thêm Thất Bại !');
            }else if (data.status === 500){
              showToast('Thêm Category', 'Mã không hợp lệ')
            }
            else{
              showToast('Thêm Category','Category đã tồn tại','error');
            }
            hideLoading()
          })
          .then(data =>{
            var catrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i.name+'</td>'+
                      '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                  '</tr>';
              catrow+=row;
            } 
            
            CatTable.innerHTML = catrow;
            clickRowCat();
            showToast('Thêm Category','Thêm Thành Công');
            hideLoading()
          })
  }

});

updateCat.addEventListener('click',function(){
  if(addCatID.value ==  '' || addCatName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const data = JSON.stringify({
      addCatID : addCatID.value,
      addCatName : addCatName.value,
      addCatParent : addCatParent.value,
    });
    showLoading()
    fetch(window.location.origin+'/manager/updatecategory',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Category không tồn tại','Cập Nhật Thất Bại !','error');
            }
            else{
              showToast('Cập nhật Category','Cập Nhật thất bại !','error');
            }
            hideLoading()
          })
          .then((data)=>{
            var catrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i.name+'</td>'+
                      '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                  '</tr>';
              catrow+=row;
            } 
            
            CatTable.innerHTML = catrow;
            clickRowCat();
              showToast('Cập nhật Category','Cập nhật Thành Công');
              hideLoading()
          })
  }

  
});

const removeCat = () => {
  const data = JSON.stringify({
    addCatID : addCatID.value,
    addCatName : addCatName.value,
    addCatParent : addCatParent.value,
  });
  showLoading()
  fetch(window.location.origin+'/manager/deletecategory',{method:'post',body:data,headers: {
      'Content-Type': 'application/json'
  },})
      .then((data) => {
          console.log(data)
          if(data.status == 200){
            return data.json();
              
          }else if (data.status === 300){
            showToast('Xóa Category','Bạn không thể xoá danh mục này vì có sản phẩm thuộc danh mục này','error');
          }
          else if(data.status == 400){
            showToast('Xóa Category','Category vốn không tồn tại','error');
          }
          else if(data.status == 500){
            showToast('Xóa Category','Xóa thất bại !','error');
          }
          hideLoading()
        })
        .then(data=>{
          var catrow = '';
          for(let i of data){
            var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                    '<td>'+i._id+'</td>'+
                    '<td>'+i.name+'</td>'+
                    '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                '</tr>';
            catrow+=row;
          } 
          
          CatTable.innerHTML = catrow;
          clickRowCat();
            showToast('Xóa Category','Xóa Thành Công');
            hideLoading()
        })
}

deleteCat.addEventListener('click',function(){
  if(addCatID.value ==  '' || addCatName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    $(".property-confirm-modal .modal-title").html('Xoá danh mục')
    $(".property-confirm-modal .modal-body").html(`Bạn có muốn xoá danh mục <b>${addCatName.value}</b>`)
    $(".property-confirm-modal .confirm").attr("data-property", "category")
    $(".property-confirm-modal .confirm").attr("data-id", addCatID.value)
    $(".property-confirm-modal").modal("show")
    
  }
  
});

/////Color:
const sizeRowColor = document.querySelectorAll('#colorTable tr');
const updateColor = document.querySelector('#update-color-btn');
const deleteColor = document.querySelector('#delete-color-btn');
const addColor = document.querySelector('#add-color-btn');
const cancelColor = document.querySelector('#cancel-color-btn');
const propertytitleColor = document.querySelector('.propery-title-color');
const addColorID = document.querySelector('#add-colorid-input');
const addColorName = document.querySelector('#add-colorname-input');
const addcolorbtn = document.querySelector('#add-color-btn');
const clickRowColor = function(){

  for(let i of document.querySelectorAll('#colorTable tr')){
    i.addEventListener('click',function(){
      const data = JSON.stringify({
        addColorID: this.dataset.id,
        addColorName: this.dataset.name,
        addColorThumb: this.dataset.thumb
      });
    fetch(window.location.origin+'/manager/colorManager',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
                return data.json();
                
            }
        })
        .then(async data=>{
           
            updateColor.style.display = "block";
            deleteColor.style.display = "block";
            cancelColor.style.display = "block";
            propertytitleColor.style.display = "none";
            addColor.style.display = "none";
            addColorID.value = data._id;
            addColorID.setAttribute('disabled','disabled');
            addColorName.value = data.name;
            file = await urlToObject(data.thumbnail,'colorThumb');
            showFile();
          
        })
      
    });
      
  
  }
}

clickRowColor();
addcolorbtn.addEventListener('click',function(){
  var formData = new FormData();
  formData.append('colorImage',file);
  if(addColorID.value ==  '' || addColorName.value == ''){
      showToast('Cảnh báo !','Có input đang trống','warning');
    }
  else{
    formData.append('colorId',addColorID.value);
    formData.append('colorName',addColorName.value);
    showLoading()
      fetch(window.location.origin+'/manager/addcolor',{method:'post',body:formData})
          .then((data) => {
              if(data.status == 200){
                return data.json();
                 
              }
              else if(data.status == 400){
                showToast('Thêm Color','Color đã tồn tại','error');
              }
              else if(data.status == 500){
                showToast('Thêm Color','Thêm thất bại !','error');
              }
              hideLoading()
            })
            .then(data=>{
              var colorrow = '';
              for(let i of data){
                var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'" data-thumb="'+i.thumb+'">'+
                '<td>'+i._id+'</td>'+
                '<td>'+i.name+'</td>'+
                '<td>'+
                    '<img src="'+i.thumbnail+'" alt="" id="thumbnail-color">'+
                '</td>'+
            '</tr>';
                colorrow+=row;
              } 
              document.querySelector('#colorTable').innerHTML = colorrow;
              clickRowColor();
                showToast('Thêm Color','Thêm Thành Công');
                hideLoading()
            })
    }
    


})
cancelColor.addEventListener('click',function(){
  updateColor.style.display = "none";
  deleteColor.style.display = "none";
  cancelColor.style.display = "none";
  addColorID.removeAttribute('disabled')
  propertytitleColor.style.display = "block";
  addcolorbtn.style.display = "block";
})

const removeColor = (id) => {
  const formData = new FormData();
  console.log(id)
  formData.append('colorId', id);
  showLoading()
  fetch(window.location.origin+'/manager/deletecolor',{method:'post',headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({colorId: id})})
      .then((data) => {
          if(data.status == 200){
            return data.json();
          }else if (data.status === 300){
            showToast('Color','Bạn không thể xoá màu này vì có sản phẩm thuộc màu này','error');
          }
          else if(data.status == 400){
            showToast('Xoá Color','Color vốn không tồn tại','error');
          }
          else if(data.status == 500){
            showToast('Xóa Color','Xóa thất bại !','error');
          }
          hideLoading()
        })
        .then(data=>{
            var colorrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'" data-thumb="'+i.thumb+'">'+
              '<td>'+i._id+'</td>'+
              '<td>'+i.name+'</td>'+
              '<td>'+
                  '<img src="'+i.thumbnail+'" alt="" id="thumbnail-color">'+
              '</td>'+
          '</tr>';
              colorrow+=row;
            } 
            document.querySelector('#colorTable').innerHTML = colorrow;
            clickRowColor();
              showToast('Xóa Color','Xóa Thành Công');
              hideLoading()
        })
}

deleteColor.addEventListener('click',function(){
  if(addColorID.value ==  '' || addColorName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    $(".property-confirm-modal .modal-title").html('Xoá màu sắc')
    $(".property-confirm-modal .modal-body").html(`Bạn có muốn xoá màu săc <b>${addColorName.value}</b>`)
    $(".property-confirm-modal .confirm").attr("data-property", "color")
    $(".property-confirm-modal .confirm").attr("data-id", addColorID.value)
    $(".property-confirm-modal").modal("show")
    
  }
  
});

updateColor.addEventListener('click',function(){
  if(addColorID.value ==  '' || addColorName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const formData = new FormData();
    formData.append('colorImage',file);
    formData.append('colorId',addColorID.value);
    formData.append('colorName',addColorName.value);
    showLoading()
    fetch(window.location.origin+'/manager/updatecolor',{method:'post',body:formData})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Color không tồn tại','Cập nhật Thất Bại !','error');
            }
            else if(data.status == 500){
              showToast('Cập nhật Color','Cập nhật thất bại !','error');
            }
            hideLoading()
          })
          .then(data =>{
              var colorrow = '';
              for(let i of data){
                var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'" data-thumb="'+i.thumb+'">'+
                '<td>'+i._id+'</td>'+
                '<td>'+i.name+'</td>'+
                '<td>'+
                    '<img src="'+i.thumbnail+'" alt="" id="thumbnail-color">'+
                '</td>'+
            '</tr>';
                colorrow+=row;
              } 
              document.querySelector('#colorTable').innerHTML = colorrow;
              clickRowColor();
                showToast('Cập nhật Color','Cập nhật Thành Công');
                hideLoading()
          })
  }
  
});


$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

$(document).ready(()=>{
  $(".property-confirm-modal .confirm").click(function(){
    const property = this.dataset.property;
    if (property === 'color'){
      const id = this.dataset.id
      removeColor(id)
    }else if(property === 'size'){
      removeSize()
    }else if(property === 'category'){
      removeCat()
    }
    
  })
})