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

///////Event Size:
const sizeRow = document.querySelectorAll('.body-half-screen tr');
const updateSize = document.querySelector('#update-size-btn');
const deleteSize = document.querySelector('#delete-size-btn');
const addSize = document.querySelector('#add-size-btn');
const cancelSize = document.querySelector('#cancel-size-btn');
const propertytitle = document.querySelector('.propery-title');
const addSizeID = document.querySelector('#add-size-input-id');
const addSizeName = document.querySelector('#add-size-input-name');
const addSizeDesc = document.querySelector('#add-size-input-description');
for(let i of sizeRow){
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
          addSizeName.value = data.name;
          addSizeDesc.value = data.desc;
        
      })
    
  });
    

}
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
              showToast('Thêm Size','Thêm Thành Công !');
                
            }
            else if(data.status == 300){
              showToast('Thêm Size','Thêm Thất Bại !');
            }
            else{
              showToast('Thêm Size','Size đã tồn tại','error');
            }
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
              showToast('Cập nhật Size Size','Cập Nhật Thành Công !');
              return data.json();
                
            }
            else if(data.status == 400){
              showToast('Size không tồn tại','Cập Nhật Thất Bại !','error');
            }
            else{
              showToast('Cập nhật Size','Cập Nhật thất bại !','error');
            }
          })
  }
  
});

/////