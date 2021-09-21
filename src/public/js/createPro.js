const create_title = document.querySelector('.create_title');
const proSale_select = document.querySelector('#proSale__select');
const proSaleValueShow = document.querySelector('#proSaleValueShow');
const proSale_select_yes = document.querySelector('#yes');
const proSale_select_no = document.querySelector('#no');

proSale_select.onchange = (e) => {
    
    if(e.target.value == "Yes"){
        proSaleValueShow.classList.remove('proSaleValueShow');
    }
    else{
        proSaleValueShow.classList.add('proSaleValueShow');
    }
    
    
}
