//Product Controll Table

var title_icon = document.querySelector('.fa-list');
var sbtitlep = document.querySelector('.side__bar--title-name');
var sbtitlesp = document.querySelector('.side__bar--title-name span');
var sbtitle = document.querySelector('.side__bar--title');
var sbtitlei = document.querySelector('.side__bar--title i');
var sbcategory = document.querySelector('.side__bar--category');
var sbitemlist = document.querySelector('.side__bar--list');
var listitem = document.querySelectorAll('.side__bar--item');
var listi = document.querySelectorAll('.side__bar--item i');
var listp = document.querySelectorAll('.side__bar--item span');
var sidebar = document.querySelector('.side__bar');
var grid__nav = document.querySelector('.grid__nav');
var table = document.querySelector('.table');
var root = document.querySelector(':root');
var flag_zoomout_sidebar = 0;
//set .proTable width:
var proTable = document.querySelector('.proTable');
title_icon.addEventListener('click',function(){
  if(flag_zoomout_sidebar == 1){
    sidebar.classList.add('side__bar');
    sidebar.classList.remove('zoomout__sidebar');
    sbtitlep.classList.remove('zoomout_sidebar-p');
    sbtitle.classList.remove('zoomout_side__bar--title');
    proTable.style.width = `calc(100% - 250px)`;
    for(let i of listp){
      i.classList.remove('zoomout_sidebar-p');
    }
    proTable.style.width = `calc(100% - 250px)`;
    sbtitlep.style.animation = "sidebar__name--span ease-in 0.3s";
    flag_zoomout_sidebar = 0;
  }
  else{
    sidebar.classList.remove('side__bar');
    sidebar.classList.add('zoomout__sidebar');
    sbtitlep.classList.add('zoomout_sidebar-p');
    sbtitle.classList.add('zoomout_side__bar--title');
    for(let i of listp){
      i.classList.add('zoomout_sidebar-p');
    }
    proTable.style.width = `calc(100% - 70px)`;
    sbtitlesp.style.animation ="";
    flag_zoomout_sidebar = 1;
  }
 
  
});
const createObj = document.querySelector('#createObj');
const deleteObj = document.querySelector('#deleteObj');
createObj.onclick = () =>{
  window.location.href = '/create';
};


//Edit Empty Table:

const empty__table = document.querySelector('#empty__table');
const available_tr = document.querySelectorAll('.available__tr');

if(available_tr.length !=0){
  empty__table.classList.add('non-empty__table');
}
else{
  empty__table.classList.remove('non-empty__table');
}

// edit table by js:
const actions = document.querySelector('.dropdown__item');
if(document.querySelectorAll('.dropdown__item ul li').length != 0){
  const actions_item = document.querySelectorAll('.dropdown__item ul li');

for(var item in actions_item){
  const borderColor = item == 0 ? "rgb(214, 54, 14)":"rgb(20, 182, 20)";
  // actions_item[`${item}`].addEventListener('mouseover',(e) =>{
  //     actions.style.boxShadow =`0px 0px 0px 5px ${borderColor}, inset 0px 10px 27px -8px #141414, inset 0px -10px 27px -8px rgb(155, 144, 144), 1px 1px 25px -3px rgb(155, 144, 144)`;
  // })
  // actions_item["0"].addEventListener('mouseout',(e) =>{
  //     actions.style.boxShadow ="0px 0px 0px 5px #A0A0A0, inset 0px 10px 27px -8px #141414, inset 0px -10px 27px -8px rgb(155, 144, 144), 1px 1px 25px -3px rgb(155, 144, 144)";
  //   })
  actions_item[item].onmouseover = (e)=>{
    actions.style.boxShadow =`0px 0px 0px 5px ${borderColor}, inset 0px 10px 27px -8px #141414, inset 0px -10px 27px -8px rgb(155, 144, 144), 1px 1px 25px -3px rgb(155, 144, 144)`;
  }
  actions_item[item].onmouseout = (e)=>{
    actions.style.boxShadow =`0px 0px 0px 5px #A0A0A0, inset 0px 10px 27px -8px #141414, inset 0px -10px 27px -8px rgb(155, 144, 144), 1px 1px 25px -3px rgb(155, 144, 144)`;
  }
}
}

const LYAFHeader = document.querySelector('.LYAF-header');
// LYAFHeader.classList.add('zoomout_sidebar-p');
