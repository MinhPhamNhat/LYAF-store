//Edit Header:
$(document).ready(()=>{
    $(".LYAF-header-dropdown").hover(() =>{
        if (!$("#dropdown-action").is(':visible')){
            $("#dropdown-action").show(100)
            $(".LYAF-header-dropdown #btn-dropdown").css("color", "black")
        }
    },function() {
        if ($("#dropdown-action").is(':visible')){
            $("#dropdown-action").hide(100)
            $(".LYAF-header-dropdown #btn-dropdown").css("color", "white")
        }
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

  //fa-user-circle:
  const fa_user_circle = document.querySelector('.fa-user-circle');
  fa_user_circle.addEventListener('click',() => {
      window.location.href = "/login";
  });