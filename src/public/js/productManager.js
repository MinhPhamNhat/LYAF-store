
//Remove header:
const LYAF_header = document.querySelector('.LYAF-header');
LYAF_header.classList.add('none');
//
$(document).ready(()=>{
    $(".LYAF-side-bar-header i").on("click", () => {
        if ($(".LYAF-side-bar-header i").hasClass("fa-bars")){

            $(".LYAF-side-bar").css("left","0")
            $(".LYAF-side-bar-menu .LYAF-menu .icon").css("left","0")

            $(".LYAF-side-bar-menu .LYAF-menu .end").fadeIn(100)
            $(".LYAF-side-bar-menu .LYAF-menu .title").fadeIn(100)

            $(".LYAF-side-bar-header i").addClass("fas fa-window-close")
            $(".LYAF-side-bar-header i").removeClass("fas fa-bars")
            $(".LYAF-side-bar-header i").addClass("fas fa-window-close")

        }else if ($(".LYAF-side-bar-header i").hasClass("fa-window-close")){
            $(".LYAF-side-bar").css("left","-190px")
            $(".LYAF-side-bar-menu .LYAF-menu .icon").css("left","190px")

            $(".LYAF-side-bar-menu .LYAF-menu .end").fadeOut(100)
            $(".LYAF-side-bar-menu .LYAF-menu .title").fadeOut(100)

            $(".LYAF-side-bar-header i").removeClass("fas fa-window-close")
            $(".LYAF-side-bar-header i").addClass("fas fa-bars")

        }
    })
})

const changeIcon = (element) => {
    $(element).find(".icon").css("color","rgb(72, 153, 190)")
}

const changeBackIcon = (element) => {
    $(element).find(".icon").css("color","rgb(183, 183, 185)")
}