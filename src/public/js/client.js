<<<<<<< Updated upstream
$(document).ready(()=>{
    var splide = new Splide( '.splide', {
        type   : 'fade',
        rewind: true,
        perPage : 1,
        autoplay: true,
      });
    splide.mount();

    $(".LYAF-body-block .tab-toggle").on('click', function(){
        var dataToggle = this.dataset.toggle;
        
        $(".tab-toggle").removeClass('active')
        $(this).addClass('active')

        $(".block-tab").addClass('d-none');
        $(`#tab-${dataToggle}`).removeClass('d-none');
    })
})
=======
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


//Grid Item:
const grid__item = document.querySelectorAll('.grid__item');

for(let i of grid__item){
  i.style.height =`calc(${window.getComputedStyle(i).getPropertyValue('width')} + 80px)`;
  window.addEventListener('resize', (e) =>{
    i.style.height = `calc(${window.getComputedStyle(i).getPropertyValue('width')} + 80px)`;
  });
}

//sale-Product:
var swiper = new Swiper(".sale_product--swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  slidesPerGroup: 2,
  loop: true,
  loopFillGroupWithBlank: false,
  breakpoints: {
    // when window width is <= 499px
    700: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});





>>>>>>> Stashed changes
