
export class Filter {
    
    tag1 = {
        property: "price",
        name:"Price",
        action: "equal",
        value: 100,
    }
    tag2 = {
        property: "price",
        name:"Price",
        action: "between",
        value: {
            from: 0,
            to: 100
        }
    }
    tag3 = {
        property: "color",
        name:"Color",
        action: "has",
        value: [{
            name: "Đỏ",
            colorID: "R",
            colorImage: "color-red.jpg",
          },
          {
            name: "Đen",
            colorID: "B",
            colorImage: "color-black.jpg",
          },
          {
            name: "Camo rêu",
            colorID: "CR",
            colorImage: "color-camo-green.jpg",
          }]
    }

    tags = [
        this.tag1,this.tag2,this.tag3
    ]
    constructor(elementClassName, {data, sizeList, colorList, categoryList}){
        this.elementClassName = elementClassName
        this.data = data
        $(`.${elementClassName}`).append(this.generateFilter())
  
       // DROPDOWN MENU FILTER 
      $(`.${elementClassName} .LYAF-product-filter-add-btn`).click(function(){
        $(`.${elementClassName} .LYAF-product-filter-add .child-menu`).hide();
      })
      $(`.${elementClassName} .LYAF-product-filter-add`).on("click", ".dropdown-menu", (e) => {
        e.stopPropagation();
      });
      $(`.${elementClassName} .LYAF-product-filter-add .btn-group`).on('hide.bs.dropdown', function (e) {
        if (e.clickEvent && ($(e.clickEvent.target).closest('#lc-select-dd')[0] || $(e.clickEvent.target).closest('.lcslt-multi-selected')[0])) {
          e.preventDefault();
        }
      });
    // END DROPDOWN MENU FILTER
  
    // LC_SELECT SETUP
    this.select = new lc_select(`.${elementClassName} .LYAF-selecter`, {
      enable_search: true,
      min_for_search: 7,
      autofocus_search: false,
      wrap_width: "100%",
      pre_placeh_opt: false,
      max_opts: false,
      on_change: function (value, target) {
          console.log(this)
      },
      labels: [
        "search options",
        "add options",
        "Select options ..",
        ".. no matching options ..",
      ],
    })
  
    if ($(`.${elementClassName} #filter-size-select`)) {
      sizeList.forEach((_) =>
        $(`.${elementClassName} #filter-size-select`).append(
          `<option value="${_.sizeID}">${_.name} - ${_.desc}</option>`
        )
      );
    }
    if ($(`.${elementClassName} #filter-category-select`)) {
      categoryList.forEach((_) =>
        {
          $(`.${elementClassName} #filter-category-select`).append(
            `<option value="${_.categoryID}"><strong>${_.name}</strong></option>`
          )
          if (_.child){
            _.child.forEach((__) =>{
              $(`.${elementClassName}  #filter-category-select`).append(
                `<option value="${__.categoryID}">${__.name}</option>`
              )
            })
          }
        }
      );
    }
    if ($(`.${elementClassName} #filter-color-select`)) {
      colorList.forEach((_) =>
        $(`.${elementClassName} #filter-color-select`).append(
          `<option value="${_.colorID}" data-image="../img/${_.colorImage}">${_.name}</option>`
        )
      );
    }
    // END LC_SELECT SETUP
  
      $(`.${elementClassName} .menu-toggle-btn`).click(function(){
        const resyncEvent = new Event('lc-select-refresh');
        document.querySelector(`.${elementClassName} .LYAF-selecter`).dispatchEvent(resyncEvent);
        $(`.${elementClassName} .LYAF-product-filter-add .child-menu`).hide();
        $(`.${elementClassName} .filter-${this.dataset.filter}`).show();
      })
  
      $(`.${elementClassName} .filter-radio-toggle`).click(function(){
          var filterType = this.name
          var inputId = this.dataset.toggle
          $(`.filter-${filterType} .input-value input`).attr('readonly', true)
          $(`.filter-${filterType} #${inputId} input`).attr('readonly', false)
      })

      var a = this.generateTag

      $(`.${elementClassName} .value-input`).on('input',function() {
          var property = this.dataset.filter
          var name = this.dataset.name
          var action = $(`.${elementClassName} .filter-${property} .filter-radio-toggle:checked`)[0].dataset.action
          var value =  action !== "between"?this.value:{
            from : $(`.${elementClassName} .filter-${property} #${property}-input-from`).val(),
            to : $(`.${elementClassName} .filter-${property} #${property}-input-to`).val()
          } 
          $(`.${elementClassName} .filter-${property} #content`).html(a({
                property,
                name,
                action,
                value,
            }))
      })
    }

    generateFilter = () => {
        var filters = this.data.map(_=>{
            return `
            <div class="btn-group dropright" style="width: 100%;">
                <button href="javascript:void(0)" data-filter="${_.property}" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${_.title}</button>
                <div class="dropdown-menu child-menu filter-${_.property}" data-filter="${_.property}">
                    <div id="filter-title">
                        <h5 class="text-uppercase font-weight-bold">${_.title}</h5>
                    </div>
                    <div id="filter-tag-preview">
                        <span>Tag: </span>
                        <span id="content"></span> 
                    </div>
                    <hr>
                    <div id="filter-menu" data-filter="${_.property}">
                        ${this.filterType[_.type](_)}
                    </div>
                    <hr>
                    <div id="filter-menu-action-btn">
                        <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="${_.property}">Cancel</button>
                        <button type="button" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        `})

        return `
            <div class="LYAF-product-filter-wrapper">
            <div class="LYAF-product-filter">
                <div class="LYAF-product-filter-add">
                    <div class="btn-group">
                        <div class="LYAF-product-filter-add-btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Filter <i class="fas fa-filter"></i></span>
                        </div>
                        <div class="dropdown-menu parent-menu id-menu">
                            ${filters.join('')}
                        </div>
                    </div>
                </div>
                <div class="LYAF-product-filter-search">
                    <span>Apply filters <i class="fas fa-search"></i></span>
                </div>
                ${this.showTags(this.tags)}
            </div>
        </div>
        `
    }
    showTags = (tags) => {
        return tags.map(_ => `<span id="tag">${this.generateTag(_)}<i class="fas fa-times"></i></span>`).join('')
    }
    generateTag = (tag) => {
        switch (tag.action){
            case "contain":
                return `<strong>${tag.name}</strong> contains<b><i> "${tag.value}"</i></b>`
                break;
            case "has":
                return `<strong>${tag.name}</strong> has <b><i>${tag.value.map(_=> `${_.name}`).join(', ')}</i></b>`
                break;
            case "equal":
                return `<strong>${tag.name}</strong> equals to <b><i>${tag.property==='price'?`${tag.value}.000 VNĐ`:tag.value}</i></b>`
                break;
            case "greater":
                return `<strong>${tag.name}</strong> greater than <b><i>${tag.property==='price'?`${tag.value}.000 VNĐ`:tag.value}</i></b>`
                break;
            case "less":
                return `<strong>${tag.name}</strong> less than <b><i>${tag.property==='price'?`${tag.value}.000 VNĐ`:tag.value}</i></b>`
                break;
            case "between":
                return `<strong>${tag.name}</strong> between <b><i>${tag.property==='price'?`${tag.value.from}.000 VNĐ`:tag.value.from}</i></b> and <b><i>${tag.property==='price'?`${tag.value.to}.000 VNĐ`:tag.value.to}</i></b>`
                break;
        }
    }

    filterType = {
        "text": (_)=> `
            <div class="form-check mb-1">
                <input class="form-check-input filter-radio-toggle" type="radio" name="${_.property}" id="${_.property}-radio-contain" data-action="contain" data-toggle='1'>
                <label class="form-check-label" for="${_.property}-radio-contain">contain</label>
            </div>
            <div class="form-group mb-1" id="1">
                <input readonly type="text" class="form-control form-control-sm value-input" data-name="${_.title}" data-filter="${_.property}" id="${_.property}-input-contain" placeholder="Text here">
            </div>
        `,
        "number" : (_) => `
            <!-- ${_.property} EQUAL TO -->
            <div class="form-check mb-1">
                <input class="form-check-input filter-radio-toggle" type="radio" name="${_.property}" id="${_.property}-radio-equal" data-action="equal" data-toggle='2'>
                <label class="form-check-label" for="${_.property}-radio-equal">equal to</label>
            </div>
            <div class="form-group mb-1 input-value"  id="2">
                <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${_.property}" id="${_.property}-input-equal" placeholder="Quantity here">
            </div>
            <!-- ${_.property} LESS THAN -->
            <div class="form-check mb-1">
                <input class="form-check-input filter-radio-toggle" type="radio" name="${_.property}" id="${_.property}-radio-less" data-action="less" data-toggle='3'>
                <label class="form-check-label" for="${_.property}-radio-less">less than</label>
            </div>
            <div class="form-group mb-1 input-value"  id="3">
                <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${_.property}" id="${_.property}-input-less" placeholder="Quantity here">
            </div>
            <!-- ${_.property} GREATER THAN -->
            <div class="form-check mb-1">
                <input class="form-check-input filter-radio-toggle" type="radio" name="${_.property}" id="${_.property}-radio-greater" data-action="greater" data-toggle='4'>
                <label class="form-check-label" for="${_.property}-radio-greater">greater than</label>
            </div>
            <div class="form-group mb-1 input-value"  id="4">
                <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${_.property}" id="${_.property}-input-greater" placeholder="Quantity here">
            </div>
            <!-- ${_.property} BETWEEN -->
            <div class="form-check mb-1">
                <input class="form-check-input filter-radio-toggle" type="radio" name="${_.property}" id="${_.property}-radio-between" data-action="between" data-toggle='5'>
                <label class="form-check-label" for="${_.property}-radio-between">between</label>
            </div>
            <div class="form-group row mb-1 input-value"  id="5">
                <label for="${_.property}-input-from" class="col-form-label col-sm-2">from</label>
                <input readonly type="number" class="form-control form-control-sm col-sm-4 value-input" data-name="${_.title}" data-filter="${_.property}" data-range="from" id="${_.property}-input-from" placeholder="Quantity here">
                <label for="${_.property}-input-to" class="col-form-label col-sm-2">to</label>
                <input readonly type="number" class="form-control form-control-sm col-sm-4 value-input" data-name="${_.title}" data-filter="${_.property}" data-range="to" id="${_.property}-input-to" placeholder="Quantity here">
            </div>`
        ,
        "category" : (_) => `
            <select name="simple" id="filter-${_.property}-select" class="LYAF-selecter" data-placeholder="Select your option ..." multiple>
            </select>  `
    }
  }

//   a= `
//   <div class="LYAF-product-filter-wrapper">
//     <div class="LYAF-product-filter">
//         <div class="LYAF-product-filter-add">
//             <div class="btn-group">
//                 <div class="LYAF-product-filter-add-btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     <span>Filter <i class="fas fa-filter"></i></span>
//                 </div>
//                 <div class="dropdown-menu parent-menu id-menu">
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="id" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ID</button>
//                         <div class="dropdown-menu child-menu filter-id" data-filter="id">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">ID</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="id">
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="id" id="id-radio-contain" data-toggle='1'>
//                                     <label class="form-check-label" for="id-radio-contain">contain</label>
//                                 </div>
//                                 <div class="form-group mb-1" id="1">
//                                     <input readonly type="text" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="id-input-contain" placeholder="Text here">
//                                 </div>
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="id">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="name" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Name</button>
//                         <div class="dropdown-menu child-menu filter-name">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Name</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="name">
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="name" id="name-radio-contain" data-toggle='1'>
//                                     <label class="form-check-label" for="name-radio-contain">contain</label>
//                                 </div>
//                                 <div class="form-group mb-1" id="1">
//                                     <input readonly type="text" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="name-input-contain" placeholder="Text here">
//                                 </div>
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="name">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="price" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Price</button>
//                         <div class="dropdown-menu child-menu filter-price">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Price</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="price">
//                                 <!-- PRICE EQUAL TO -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="price" id="price-radio-equal" data-toggle='1'>
//                                     <label class="form-check-label" for="price-radio-equal">equal to</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value" id="1">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="price-input-equal" placeholder="Price here">
//                                 </div>
//                                 <!-- PRICE LESS THAN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="price" id="price-radio-less" data-toggle='2'>
//                                     <label class="form-check-label" for="price-radio-less">less than</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value" id="2">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="price-input-less" placeholder="Price here">
//                                 </div>
//                                 <!-- PRICE GREATER THAN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="price" id="price-radio-greater" data-toggle='3'>
//                                     <label class="form-check-label" for="price-radio-greater">greater than</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value"  id="3">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="price-input-greater" placeholder="Price here">
//                                 </div>
//                                 <!-- PRICE BETWEEN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="price" id="price-radio-between" data-toggle='4'>
//                                     <label class="form-check-label" for="price-radio-between">between</label>
//                                 </div>
//                                 <div class="form-group row mb-1 input-value"  id="4">
//                                     <label for="price-input-from" class="col-form-label col-sm-2">from</label>
//                                     <input readonly type="number" class="form-control form-control-sm col-sm-4" id="price-input-from" placeholder="Price here">
//                                     <label for="price-input-to" class="col-form-label col-sm-2">to</label>
//                                     <input readonly type="number" class="form-control form-control-sm col-sm-4" id="price-input-to" placeholder="Price here">
//                                 </div>
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="price">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="category" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>
//                         <div class="dropdown-menu child-menu filter-category">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Category</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="category">
//                                 <select name="simple" id="filter-category-select" class="LYAF-selecter" data-placeholder="Select your product colors ..." multiple>
//                                 </select>    
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="category">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="color" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Color</button>
//                         <div class="dropdown-menu child-menu filter-color">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Color</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="color">
//                                 <select name="simple" id="filter-color-select" class="LYAF-selecter" data-placeholder="Select your product colors ..." multiple>
//                                 </select>    
//                             </div>  
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="color">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div> 
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="quantity" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stock</button>
//                         <div class="dropdown-menu child-menu filter-quantity">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Stock</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="quantity">
//                                 <!-- quantity EQUAL TO -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="quantity" id="quantity-radio-equal" data-toggle='1'>
//                                     <label class="form-check-label" for="quantity-radio-equal">equal to</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value"  id="1">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="quantity-input-equal" placeholder="Quantity here">
//                                 </div>
//                                 <!-- quantity LESS THAN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="quantity" id="quantity-radio-less" data-toggle='2'>
//                                     <label class="form-check-label" for="quantity-radio-less">less than</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value"  id="2">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="quantity-input-less" placeholder="Quantity here">
//                                 </div>
//                                 <!-- quantity GREATER THAN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="quantity" id="quantity-radio-greater" data-toggle='3'>
//                                     <label class="form-check-label" for="quantity-radio-greater">greater than</label>
//                                 </div>
//                                 <div class="form-group mb-1 input-value"  id="3">
//                                     <input readonly type="number" class="form-control form-control value-input" data-name="${_.title}" data-filter="${property}" id="quantity-input-greater" placeholder="Quantity here">
//                                 </div>
//                                 <!-- quantity BETWEEN -->
//                                 <div class="form-check mb-1">
//                                     <input class="form-check-input filter-radio-toggle" type="radio" name="quantity" id="quantity-radio-between" data-toggle='4'>
//                                     <label class="form-check-label" for="quantity-radio-between">between</label>
//                                 </div>
//                                 <div class="form-group row mb-1 input-value"  id="4">
//                                     <label for="quantity-input-from" class="col-form-label col-sm-2">from</label>
//                                     <input readonly type="number" class="form-control form-control-sm col-sm-4" id="quantity-input-from" placeholder="Quantity here">
//                                     <label for="quantity-input-to" class="col-form-label col-sm-2">to</label>
//                                     <input readonly type="number" class="form-control form-control-sm col-sm-4" id="quantity-input-to" placeholder="Quantity here">
//                                 </div>
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="quantity">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="rate" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Rate</button>
//                         <div class="dropdown-menu child-menu filter-rate">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Rate</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="rate">
                                
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="rate">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="btn-group dropright" style="width: 100%;">
//                         <button href="javascript:void(0)" data-filter="size" class="dropdown-item menu-toggle-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Size</button>
//                         <div class="dropdown-menu child-menu filter-size">
//                             <div id="filter-title">
//                                 <h5 class="text-uppercase font-weight-bold">Size</h5>
//                             </div>
//                             <div id="filter-tag-preview">
//                                 <span>Tag: </span>
//                                 <span id="content"></span> 
//                             </div>
//                             <hr>
//                             <div id="filter-menu" data-filter="size">
//                                 <select name="simple" id="filter-size-select" class="LYAF-selecter" data-placeholder="Select your product colors ..." multiple>
//                                 </select>    
//                             </div>
//                             <hr>
//                             <div id="filter-menu-action-btn">
//                                 <button type="button" class="btn btn-secondary" id="cancel-filter" data-menu="">Cancel</button>
//                                 <button type="button" class="btn btn-primary">Add</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="LYAF-product-filter-search">
//             <span>Apply filters <i class="fas fa-search"></i></span>
//         </div>
//         <span id="tag"><strong>ID</strong> has AS <i class="fas fa-times"></i></span>
//         <span id="tag"><strong>Category</strong> has Áo <i class="fas fa-times"></i></span>
//         <span id="tag"><strong>Color</strong> has Đỏ, Đen <i class="fas fa-times"></i></span>
//     </div>
// </div>
//   `