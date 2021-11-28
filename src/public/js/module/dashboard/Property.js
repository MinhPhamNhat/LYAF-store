   //selecting all required elements
   const dropArea = document.querySelector(".drag-area"),
   dragText = dropArea.querySelector("header"),
   button = dropArea.querySelector("button"),
   input = dropArea.querySelector("input");
   let file; //this is a global variable and we'll use it inside multiple functions
   
   button.onclick = ()=>{
     input.click(); //if user click on the button then the input also clicked
   }
   
   input.addEventListener("change", function(){
     //getting user select file and [0] this means if user select multiple files then we'll select only the first one
     file = this.files[0];
     dropArea.classList.add("active");
     showFile(); //calling function
   });
   
   
   //If user Drag File Over DropArea
   dropArea.addEventListener("dragover", (event)=>{
     event.preventDefault(); //preventing from default behaviour
     dropArea.classList.add("active");
     dragText.textContent = "Release to Upload File";
   });
   
   //If user leave dragged File from DropArea
   dropArea.addEventListener("dragleave", ()=>{
     dropArea.classList.remove("active");
     dragText.textContent = "Drag & Drop to Upload File";
   });
   
   //If user drop File on DropArea
   dropArea.addEventListener("drop", (event)=>{
     event.preventDefault(); //preventing from default behaviour
     //getting user select file and [0] this means if user select multiple files then we'll select only the first one
     file = event.dataTransfer.files[0];
     showFile(); //calling function
   });
   
   function showFile(){
     let fileType = file.type; //getting selected file type
     let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
     if(validExtensions.includes(fileType)){ //if user selected file is an image file
       let fileReader = new FileReader(); //creating new FileReader object
       fileReader.onload = ()=>{
         let fileURL = fileReader.result; //passing user file source in fileURL variable
         let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
         dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
       }
       fileReader.readAsDataURL(file);
     }else{
       alert("This is not an Image File!");
       dropArea.classList.remove("active");
       dragText.textContent = "Drag & Drop to Upload File";
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
    fetch(window.location.origin+'/manager/addsize',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
             
                
            }
            else if(data.status == 300){
              showToast('Thêm Size','Thêm Thất Bại !','error');
            }
            else{
              showToast('Thêm Size','Size đã tồn tại','error');
            }
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
          })
  }
  
});

deleteSize.addEventListener('click',function(){
  if(addSizeID.value ==  '' || addSizeName.value == '' || addSizeDesc.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const data = JSON.stringify({
      addSizeID : addSizeID.value,
      addSizeName : addSizeName.value,
      addSizeDesc : addSizeDesc.value,
    });
    fetch(window.location.origin+'/manager/deletesize',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Size vốn không tồn tại','Xóa Thất Bại !','error');
            }
            else{
              showToast('Xóa Size','Xóa thất bại !','error');
            }
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
          })
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
    fetch(window.location.origin+'/manager/addcategory',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 300){
              showToast('Thêm Category','Thêm Thất Bại !');
            }
            else{
              showToast('Thêm Category','Category đã tồn tại','error');
            }
          })
          .then(data =>{
            var catrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                  '</tr>';
                console.log(row);  
              catrow+=row;
            } 
            console.log('catRow:',catrow);
            
            CatTable.innerHTML = catrow;
            console.log('catTbale',CatTable);
            clickRowCat();
            showToast('Thêm Category','Thêm Thành Công');
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
          })
          .then((data)=>{
            var catrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                  '</tr>';
                console.log(row);  
              catrow+=row;
            } 
            console.log('catRow:',catrow);
            
            CatTable.innerHTML = catrow;
            console.log('catTbale',CatTable);
            clickRowCat();
              showToast('Cập nhật Category','Cập nhật Thành Công');
          })
  }

  
});

deleteCat.addEventListener('click',function(){
  if(addCatID.value ==  '' || addCatName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
  
    const data = JSON.stringify({
      addCatID : addCatID.value,
      addCatName : addCatName.value,
      addCatParent : addCatParent.value,
    });
    fetch(window.location.origin+'/manager/deletecategory',{method:'post',body:data,headers: {
        'Content-Type': 'application/json'
    },})
        .then((data) => {
            if(data.status == 200){
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Size vốn không tồn tại','Xóa Thất Bại !','error');
            }
            else if(data.status == 500){
              showToast('Xóa Size','Xóa thất bại !','error');
            }
          })
          .then(data=>{
            var catrow = '';
            for(let i of data){
              var row =  '<tr id="'+i._id+'" data-id="'+i._id+'" data-name="'+i.name+'"'+(i.parentId?("data-parentid='"+i.parentId._id+"'"):"")+'>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+i._id+'</td>'+
                      '<td>'+(i.parentId?(i.parentId.name):"")+'</td>'+
                  '</tr>';
                console.log(row);  
              catrow+=row;
            } 
            console.log('catRow:',catrow);
            
            CatTable.innerHTML = catrow;
            console.log('catTbale',CatTable);
            clickRowCat();
              showToast('Xóa Category','Xóa Thành Công');
          })
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
for(let i of sizeRowColor){
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
          console.log(data);
          addColorID.value = data._id;
          addColorName.value = data.name;
          file = await urlToObject(data.thumbnail,'colorThumb');
          showFile();
        
      })
    
  });
    

}
addcolorbtn.addEventListener('click',function(){
  var formData = new FormData();
  formData.append('colorImage',file);
  if(addColorID.value ==  '' || addColorName.value == ''){
      showToast('Cảnh báo !','Có input đang trống','warning');
    }
  else{
    formData.append('colorId',addColorID.value);
    formData.append('colorName',addColorName.value);
      fetch(window.location.origin+'/manager/addcolor',{method:'post',body:formData})
          .then((data) => {
              if(data.status == 200){
                showToast('Thêm Color','Thêm Thành Công !');
                  console.log('Thành công');
              }
              else if(data.status == 400){
                showToast('Color đã tồn tại','Thêm Thất Bại !','error');
              }
              else if(data.status == 500){
                showToast('Thêm Color','Thêm thất bại !','error');
              }
            })
    }
    


})
cancelColor.addEventListener('click',function(){
  updateColor.style.display = "none";
  deleteColor.style.display = "none";
  cancelColor.style.display = "none";
  propertytitleColor.style.display = "block";
  addcolorbtn.style.display = "block";
})

deleteColor.addEventListener('click',function(){
  if(addColorID.value ==  '' || addColorName.value == ''){
    showToast('Cảnh báo !','Có input đang trống','warning');
  }
  else{
    const formData = new FormData();
    formData.append('colorImage',file);
    formData.append('colorId',addColorID.value);
    formData.append('colorName',addColorName.value);
    fetch(window.location.origin+'/manager/deletecolor',{method:'post',body:formData})
        .then((data) => {
            if(data.status == 200){
              showToast('Xóa Size','Xóa Thành Công !');
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Size vốn không tồn tại','Xóa Thất Bại !','error');
            }
            else if(data.status == 500){
              showToast('Xóa Size','Xóa thất bại !','error');
            }
          })
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
    fetch(window.location.origin+'/manager/updatecolor',{method:'post',body:formData})
        .then((data) => {
            if(data.status == 200){
              showToast('Cập nhật Color','Cập nhật Thành Công !');
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Color không tồn tại','Cập nhật Thất Bại !','error');
            }
            else if(data.status == 500){
              showToast('Cập nhật Color','Cập nhật thất bại !','error');
            }
          })
  }
  
});