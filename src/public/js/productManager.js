
//Remove header:
if ($(".LYAF-header")){
    const LYAF_header = document.querySelector('.LYAF-header');
    LYAF_header.classList.add('none');
}

var currentInput = {
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

    // new Splide( '#image-slider',{
    //     width       : 500,
    //     trimSpace   : false,
    //     perPage     : 2,
    //     cover       : true,
	// 	heightRatio : 0.5,
    // }).mount();
    if (document.querySelector('.LYAF-preview-list')){
        var drake = dragula([document.querySelector('.LYAF-preview-list'),document.querySelector('.LYAF-remove-list')], {revertOnSpill: false});

    
        drake.on('drop', function(el, target, source, sibling){
            console.log(1)
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
                        <img src="${URL.createObjectURL(f)}" height="auto" width="100">
                        <span class="image-name">${f.name}</span>
                        <span class="remove-image-btn"><i class="fa fa-trash"></i></span>
                    </div>
                `)
            }
        }
        $(".LYAF-preview-container .info").html(`${$(".LYAF-preview-list .LYAF-image-preview").length} images`)
        $(".image-upload").val(null)
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
        console.log(currentParent.find("#thumbnail-preview"))
        currentParent.find("p").hide()
        currentParent.find("input").hide()
        currentParent.find("#thumbnail-preview")[0].src = URL.createObjectURL(file)
        currentParent.find("#thumbnail-preview")[0].onload = function() {
            URL.revokeObjectURL(currentParent.find("#thumbnail-preview")[0].src) // free memory
          }
        currentParent.find("#thumbnail-preview").show();
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