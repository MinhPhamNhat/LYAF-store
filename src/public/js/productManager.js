
//Remove header:
if ($(".LYAF-header")){
    const LYAF_header = document.querySelector('.LYAF-header');
    LYAF_header.classList.add('none');
}

var G_currentInput = {
    name: '',
    desc: '',
    price: null,
    category: null,
    productID: null,
    color: null,
    size: null,
    images: null,
    thumbnails: null,
}

const colorList = [
    {
        name: "Đỏ",
        colorID: "R",
        colorImage: "color-red.jpg"
    },
    {
        name: "Camo rêu",
        colorID: "CR",
        colorImage: "color-camo-green.jpg"
    },
    {
        name: "Camo xám",
        colorID: "CX",
        colorImage: "color-camo-grey.jpg"
    },
    {
        name: "Camo xanh",
        colorID: "CXA",
        colorImage: "color-camo-blue.jpg"
    }
]

const sizeList = [
    {
        name: "XXS",
        sizeID: "XXS",
        desc: "Rất rất nhỏ",
    },
    {
        name: "XS",
        sizeID: "XS",
        desc: "Rất nhỏ",
    },
    {
        name: "S",
        sizeID: "S",
        desc: "Nhỏ",
    },
    {
        name: "M",
        sizeID: "M",
        desc: "Trung bình",
    },
    {
        name: "L",
        sizeID: "L",
        desc: "Lớn",
    },
    {
        name: "XL",
        sizeID: "XL",
        desc: "Rất lớn",
    },
    {
        name: "XXL",
        sizeID: "XXL",
        desc: "Rất rất lớn",
    }
]

const categoryList = [
    {
        name: "Áo",
        categoryID: "A",
        child: [
            {
                name: "Áo Thun",
                categoryID: "AT",
                parent: "A",
            },
            {
                name: "Áo Sơ mi",
                categoryID: "ASM",
                parent: "A",
            },
            {
                name: "Áo khoác",
                categoryID: "AK",
                parent: "A",
            },
            {
                name: "Áo Hoodie",
                categoryID: "AH",
                parent: "A",
            },
            {
                name: "Áo len",
                categoryID: "AL",
                parent: "A",
            },
            {
                name: "Áo polo",
                categoryID: "AP",
                parent: "A",
            }
        ]
    },
    {
        name: "Quần",
        categoryID: "Q",
        child: [
            {
                name: "Quần jean",
                categoryID: "QJ",
                parent: "Q",
            },
            {
                name: "Quần tây",
                categoryID: "QT",
                parent: "Q",
            },
            {
                name: "Quần short",
                categoryID: "QS",
                parent: "Q",
            }
        ]
    },
    {
        name: "Giày, dép",
        categoryID: "GD",
        child: [
            {
                name: "Giày sandal",
                categoryID: "GS",
                parent: "GD",
            },
            {
                name: "Giày thể thao",
                categoryID: "GT",
                parent: "GD",
            },
            {
                name: "Dép kẹp",
                categoryID: "DK",
                parent: "GD",
            }
        ]
    }
]
$(document).ready(()=>{


    if ($(".color-selecter")){
        colorList.forEach(_ => $(".color-selecter").append(`<option value="${_.colorID}" data-image="../img/${_.colorImage}">${_.name}</option>`))
    }
    if ($(".size-selecter")){
        sizeList.forEach(_ => $(".size-selecter").append(`<option value="${_.sizeID}">${_.name} - ${_.desc}</option>`))
    }
    // LC_SELECT
    if ($(".LYAF-selecter"))
    new lc_select('.LYAF-selecter', {

        // (bool) whether to enable fields search
        enable_search : true, 
        
        // (int) minimum options number to show search
        min_for_search : 7,   
        
        // (bool) whether to automatically focus search field on desktop (NB: will break tabindex chain)
        autofocus_search: false,
        
        // (string) defines the wrapper width: "auto" to leave it up to CSS, "inherit" 
        // to statically copy input field width, or any other CSS sizing 
        wrap_width : 'auto',
        
        // (array) custom classes assigned to the field wrapper (.lcslt-wrap) and 
        // dropdown (#lc-select-dd)
        addit_classes : [], 
        
        // (bool) if true, on simple dropdowns without a selected value, prepend 
        // an empty option using placeholder text
        pre_placeh_opt : false, 
        
        // (int|false) defining maximum selectable options for multi-select
        max_opts : false, 
        
        // (function) triggered every time field value changes. Passes value and 
        // target field object as parameters
        on_change : null, // function(new_value, target_field) {},
    
        // (array) option used to translate script texts
        labels : [ 
            'search options',
            'add options',
            'Select options ..',
            '.. no matching options ..',
        ],
    })


    if ($(".LYAF-advanced-select")){
        categoryList.forEach(_ => $(".LYAF-advanced-select").append(`
            <div class="LYAF-advanced-option" data-action="to" data-id="${_.categoryID}">${_.name}</div>
        `))
        
        $("#cancel-option").click(()=>{
            $(".LYAF-select-category").hide(100)
        })

        $(document).on('click', '.LYAF-category-selected .product-category span', function(){
            var categoryParent = categoryList.find(_ => _.categoryID === this.dataset.parent)
            if (categoryParent){
                $(".LYAF-advanced-option").remove()
                categoryParent.child.forEach(_ => $(".LYAF-advanced-select").append(`
                    <div class="LYAF-advanced-option" data-parent="${categoryParent.categoryID}" data-id="${_.categoryID}">${_.name}</div>
                `))
            }else{
                $(".LYAF-advanced-option").remove()
                categoryList.forEach(_ => $(".LYAF-advanced-select").append(`
                    <div class="LYAF-advanced-option" data-id="${_.categoryID}">${_.name}</div>
                `))
            }
            if (!$(".LYAF-select-category").is(':visible')){
                $(".LYAF-select-category").show(100)
            }
        })

        $(document).on('click','.LYAF-advanced-option',function(){
            var category = this.dataset
            if (category.parent){
                var currentCategory = categoryList.find(_ => _.categoryID === category.parent);
                currentCategory = currentCategory.child.find(_ => _.categoryID === category.id);
            }else{
                var currentCategory = categoryList.find(_ => _.categoryID === category.id);
            }
            if (currentCategory.child){
                $(".LYAF-advanced-option").remove()
                currentCategory.child.forEach(_ => $(".LYAF-advanced-select").append(`
                    <div class="LYAF-advanced-option" data-parent="${currentCategory.categoryID}" data-id="${_.categoryID}">${_.name}</div>
                `))
                $(".LYAF-category-selected .product-category span").remove()
            }else{
                $(".LYAF-select-category").hide(100)
            }
            if ($(".LYAF-category-selected .product-category span").length > 1){
                $(".LYAF-category-selected .product-category span")[$(".LYAF-category-selected .product-category span").length - 1].remove()
            }
            $(`<span ${category.parent?`data-parent="${category.parent}"`:""}> ${currentCategory.name} <i class="fas fa-chevron-right"></i></span>`).insertBefore(".LYAF-category-selected .product-category .product-name")
            $(".product-id").text(`${currentCategory.categoryID} -`)
        })
    }
    
    $(".LYAF-product-name input").on('input',()=>{
        $('.product-name').html($(".LYAF-product-name input").val())
    })

    if ($('.LYAF-preview-list')){
        var drake = dragula([document.querySelector('.LYAF-preview-list')], {
            revertOnSpill: false,
            moves: function (el, container, handle) {
                return !($(handle).hasClass("remove-image-btn") || $(handle).hasClass("fa-trash") || $(handle).hasClass("$@da@#"));
              }
        });

    
        drake.on('drop', function(el, target, source, sibling){
            $(".LYAF-preview-container .info").html(`${$(".LYAF-preview-list .LYAF-image-preview").length} images`)
            $(".LYAF-remove-container .info").html(`${$(".LYAF-remove-list .LYAF-image-preview").length} images`)
        });
    
        var scroll = autoScroll([
            window,
            document.querySelector('.LYAF-preview-list'),
            // document.querySelector('.LYAF-remove-list'),
        ],{
        margin: 100,
        maxSpeed : 6,
        scrollWhenOutside: true,
        autoScroll: function(){
            return this.down && drake.dragging;
        }
        });
    }
    
    tinymce.init({
        height      : "300",
        selector    : 'textarea',
        plugins     : 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        toolbar_mode: 'floating',
    });


    $('.LYAF-preview-list').each(function(){
         $(this).magnificPopup({
            delegate: 'a', 
            type: 'image',
            gallery: {
              enabled:true
            }
        });
    })

    $(".LYAF-thumbnail .thumbnail-upload-holder").magnificPopup({
        delegate: 'a', 
        type: 'image'
    });


    checkActiveElement($(".LYAF-option-active"))
    hideSidebars()
    hideMenu($(".LYAF-menu-active"))

    for (i of $(".LYAF-menu-active")){
        if (!$(i).find(".LYAF-menu-content .LYAF-option-active").hasClass("LYAF-option-active")){
            $(i).removeClass("LYAF-menu-active")
            deactiveMenu(i)
        }
    }
    $(".LYAF-side-bar-header i").click(() => {
        if ($(".LYAF-side-bar-header i").hasClass("fa-bars")){
            showSidebars()
            showMenu($(".LYAF-option-active").parent().parent())
        }else if ($(".LYAF-side-bar-header i").hasClass("fa-window-close")){
            hideSidebars()
            hideMenu($(".LYAF-menu-active"))
            for (i of $(".LYAF-menu-active")){
                if (!$(i).find(".LYAF-menu-content .LYAF-option-active").hasClass("LYAF-option-active")){
                    $(i).removeClass("LYAF-menu-active")
                    deactiveMenu(i)
                }
            }
        }
    })
    
    $(document).click((e)=>{
        var $target = $(e.target);
        if(!$target.closest('.LYAF-side-bar').length) {
            if ($(".LYAF-side-bar-header i").hasClass("fa-window-close")){
                hideSidebars()
                hideMenu($(".LYAF-menu-active"))
                for (i of $(".LYAF-menu-active")){
                    if (!$(i).find(".LYAF-menu-content .LYAF-option-active").hasClass("LYAF-option-active")){
                        $(i).removeClass("LYAF-menu-active")
                        deactiveMenu(i)
                    }
                }
            }
        }
    })

    $(".LYAF-dasboard-body .LYAF-dashboard-block i").hover( function(){
        if (!$(this).parent().find(".LYAF-tooltip").is(':visible'))
        $(this).parent().find(".LYAF-tooltip").fadeIn(200)
    }, function(){
        if ($(this).parent().find(".LYAF-tooltip").is(':visible'))
        $(this).parent().find(".LYAF-tooltip").fadeOut(200)
    })

    $(".LYAF-menu").hover(function(){
        activeMenu($(this))
    }, function(){
        deactiveMenu($(this))
    })

    $(".LYAF-menu-option").hover(function(){
        activeOption($(this))
    }, function(){
        deactiveOption($(this))
    })

    $(".LYAF-menu-header").click(function(){
        tongleMenu($(this))
    })

    $(".image-upload").change(function () {
        var files = $(".image-upload")[0].files
        
        for (f of files){
            if (f) {
                $(".LYAF-preview-list").prepend(`
                    <div class="LYAF-image-preview">
                        <a href="${URL.createObjectURL(f)}"><img src="${URL.createObjectURL(f)}" class="$@da@#" height="auto" width="100"></a>
                        <span class="image-name">${f.name}</span>
                        <span class="remove-image-btn"><i class="fa fa-trash"></i></span>
                    </div>
                `)
            }
        }
        $(".LYAF-preview-container .info").html(`${$(".LYAF-preview-list .LYAF-image-preview").length} images`)
        $(".image-upload").val(null)
    })

    $(document).on('click',".LYAF-preview-list .remove-image-btn",function(){
        $(this).parent().remove()
        $(".LYAF-preview-container .info").html(`${$(".LYAF-preview-list .LYAF-image-preview").length} images`)
    })
    
    $(".remove-image").click(()=>{
        $(".LYAF-remove-container .LYAF-image-preview").remove()
        $(".LYAF-remove-container .info").html(`${$(".LYAF-remove-list .LYAF-image-preview").length} images`)
    })

    $(document).on('click',".remove-image-btn",function (){
        $(this).parent().find(".image-name")
    })

    $(".thumbnail-upload-holder input").change(function (){
        var currentParent = $(this).parent()
        var file = currentParent.find("input")[0].files[0]
        currentParent.find("p").hide()
        currentParent.find("input").hide()
        currentParent.find("#thumbnail-preview")[0].src = URL.createObjectURL(file)
        currentParent.find("a").attr("href", URL.createObjectURL(file)) 
        currentParent.find("#thumbnail-preview")[0].onload = function() {
            URL.revokeObjectURL(currentParent.find("#thumbnail-preview")[0].src) // free memory
          }
        currentParent.find("#thumbnail-preview").show();
        currentParent.find(".remove-thumbnail").show()
    })

    $(".LYAF-thumbnail .LYAF-thumbnail-input .remove-thumbnail").click(function(){
        var currentParent = $(this).parent()
        currentParent.find("p").show()
        currentParent.find("input").show()
        currentParent.find("#thumbnail-preview").hide();
        currentParent.find("a").attr("href",null) 
        currentParent.find(".remove-thumbnail").hide()
        currentParent.find("#thumbnail-preview")[0].src =""
        currentParent.find("input").val(null)
    })
})

const showSelectOption = (list) => {
    
}

const showSidebars = () => {
    $(".LYAF-side-bar").css("left","0")
    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css("left","0")
    $(".LYAF-dasboard-body").css("left","180px")

    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css("left","0")
    $(".LYAF-side-bar-menu .LYAF-menu .end").fadeIn(500)
    $(".LYAF-side-bar-menu .LYAF-menu .title").fadeIn(500)

    $(".LYAF-side-bar-header i").addClass("fas fa-window-close")
    $(".LYAF-side-bar-header i").removeClass("fas fa-bars")
    $(".LYAF-side-bar-header i").addClass("fas fa-window-close")
    
}

const hideSidebars = () => {
    $(".LYAF-side-bar").css("left","-180px")
    $(".LYAF-side-bar-menu .LYAF-menu .LYAF-menu-header .icon").css("left","180px")
    $(".LYAF-dasboard-body").css("left","0")

    $(".LYAF-side-bar-menu .LYAF-menu .end").fadeOut(100)
    $(".LYAF-side-bar-menu .LYAF-menu .title").fadeOut(100)

    $(".LYAF-side-bar-header i").removeClass("fas fa-window-close")
    $(".LYAF-side-bar-header i").addClass("fas fa-bars")
}

const checkActiveElement = (element) => {
    var parentElement = $(element).parent().parent()
    activeMenu(parentElement)
    parentElement.addClass("LYAF-menu-active")
    activeOption(element)
}
const activeOption = (element) => {
    $(element).find(".icon").css("color","rgb(72, 153, 190)")
    $(element).css("background-color","#1B1B28")
    $(element).find("span").css("color","white")
    
}

const deactiveOption = (element) => {
    if (!$(element).hasClass("LYAF-option-active")){
        $(element).find(".icon").css("color","rgb(183, 183, 185)")
        $(element).css("background-color","#1E1E2D")
        $(element).find("span").css("color","rgb(183, 183, 185)")
    }
}

const activeMenu = (element) => {
    $(element).find(".LYAF-menu-header .icon").css("color","rgb(72, 153, 190)")
    $(element).find(".LYAF-menu-header").css("background-color","#1B1B28")
    $(element).find(".LYAF-menu-header").css("color","white")
}

const deactiveMenu = (element) => {
    if(!$(element).hasClass("LYAF-menu-active") && !$(element).find(".LYAF-menu-option").hasClass("LYAF-option-active")){
        $(element).find(".icon").css("color","rgb(183, 183, 185)")
        $(element).find(".LYAF-menu-header").css("background-color","#1E1E2D")
        $(element).find(".LYAF-menu-header").css("color","rgb(183, 183, 185)")
    }
}

const showMenu = (element) => {
    $(element).find(".LYAF-menu-header .end").css("transform","rotate(90deg)")
    $(element).find(".LYAF-menu-content").slideDown()
}

const hideMenu = (element) => {
    $(element).find(".LYAF-menu-header .end").css("transform","rotate(0deg)")
    $(element).find(".LYAF-menu-content").slideUp()
    // deactiveMenu(element)
}

const tongleMenu = (element) => {
    if ($(".LYAF-side-bar-header i").hasClass("fa-bars")){
        showSidebars()
    }
    element = $(element).parent().hasClass("LYAF-menu") ? $(element).parent() : null
    if(element){
        if (!$(element).find(".LYAF-menu-content").is(':visible')){
            for (i of $(".LYAF-menu-active")){
                if (!$(i).find(".LYAF-menu-content .LYAF-option-active").hasClass("LYAF-option-active")){
                    $(i).removeClass("LYAF-menu-active")
                }
                hideMenu(i)
                deactiveMenu(i)
            }
            $(element).addClass("LYAF-menu-active")
            showMenu(element)
            activeMenu(element)
        }else{
            $(element).removeClass("LYAF-menu-active")
            hideMenu(element)
        }
    }
}