//Edit Header:
$(document).ready(()=>{
    $("#btn-dropdown").on('click', () =>{
        $("#dropdown-action").toggle()
    })
  
    $(".LYAF-header-search").on('click', () => {
        $(".LYAF-header .blur-bg").fadeIn(300)
        $(".LYAF-header .LYAF-search-box").css("right", "0")
    })
  
    $(".LYAF-search-box-close i, .LYAF-header .blur-bg").on('click', () => {
        $(".LYAF-header .blur-bg").fadeOut(300)
        $(".LYAF-header .LYAF-search-box").css("right", "-500px")
    })
  
    $(".LYAF-header-cart").on('click', () => {
        $(".LYAF-header .blur-bg").fadeIn(300)
        $(".LYAF-header .LYAF-cart-box").css("right", "0")
    })
  
    $(".LYAF-cart-box-close i, .LYAF-header .blur-bg").on('click', () => {
        $(".LYAF-header .blur-bg").fadeOut(300)
        $(".LYAF-header .LYAF-cart-box").css("right", "-500px")
    })
  })