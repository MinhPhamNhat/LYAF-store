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
for(let i of sizeRow){
  i.addEventListener('click',()=>{
    console.log(i.cells[0].innerHTML,i.cells[1].innerHTML,i.cells[2].innerHTML);
    
  });
    const data = JSON.stringify({
        sizeId = i.cell[0].innerHTML,
        sizeName: i.cells[1].innerHTML,
        sizeDesc: i.cells[2].innerHTML,
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
            const addSizeID = document.querySelector('#add-size-input-id');
            const addSizeName = document.querySelector('#add-size-input-name');
            const addSizeDesc = document.querySelector('#add-size-input-description');
            addSizeID.value = data._id;
            addSizeName.value = data.name;
            addSizeDesc.value = data.desc;
        })

}

/////