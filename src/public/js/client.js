var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
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

 //Responsive Carousel:
// const slide = document.querySelectorAll('.img-carousel');

// const carousel1_name = [
//   'summer-sale-small.jpg',
//   'new-collection-small.jpg',
//   'summer-collection-small.jpg'
 
// ];
// k_slides = slide.length;

//  function ResCarousel1(x) {
//   if (x.matches) { // If media query matches
//     for( let i =0; i < k_slides;++i){
//       slide[i].src = `../img/${carousel1_name[i]}`;
//     }
//   }
  
// }

// var x = window.matchMedia("(max-width: 900px)");
// ResCarousel1(x); // Call listener function at run time
// x.addListener(ResCarousel1); 
