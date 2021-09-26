
//Remove header:
const LYAF_header = document.querySelector('.LYAF-header');
LYAF_header.classList.add('none');
//
$(document).ready(()=>{
    new Splide( '#image-slider',{
        width       : 600,
        trimSpace   : false,
        perPage     : 2,
        cover       : true,
		heightRatio : 0.5,
    }).mount();

    tinymce.init({
        height      : "300",
        selector    : 'textarea',
        plugins     : 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        toolbar_mode: 'floating',
     });

    checkActiveElement($(".LYAF-option-active"))
    showMenu($(".LYAF-option-active").parent().parent())

    $(".LYAF-side-bar-header i").on("click", () => {
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

    $(".LYAF-dasboard-body .LYAF-dashboard-block i").hover( function(){
        if (!$(this).find(".LYAF-tooltip").is(':visible'))
        $(this).find(".LYAF-tooltip").fadeIn(200)
    }, function(){
        if ($(this).find(".LYAF-tooltip").is(':visible'))
        $(this).find(".LYAF-tooltip").fadeOut(200)
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
})

const showSidebars = () => {
    $(".LYAF-side-bar").css("left","0")
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