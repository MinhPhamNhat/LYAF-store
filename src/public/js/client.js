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


//Grid Iten:
const grid__item = document.querySelectorAll('.grid__item');

for(let i of grid__item){
  i.style.height =`calc(${window.getComputedStyle(i).getPropertyValue('width')} + 100px)`;
  window.addEventListener('resize', (e) =>{
    i.style.height = `calc(${window.getComputedStyle(i).getPropertyValue('width')} + 100px)`;
  });
}