let swiper=new Swiper(".swiper",{centeredSlides:!0,slidesPerView:3,spaceBetween:50,direction:"horizontal",initialSlide:1,speed:600,preventClicks:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{320:{slidesPerView:1},850:{slidesPerView:2,centeredSlides:!1},1280:{slidesPerView:3}}});function updateNavigation(e){var i=e.slides.length,t=e.activeIndex;t<=1?(e.navigation.prevEl.classList.add("swiper-button-disabled"),e.navigation.prevEl.setAttribute("disabled",!0)):(e.navigation.prevEl.classList.remove("swiper-button-disabled"),e.navigation.prevEl.removeAttribute("disabled")),i-2<=t?(e.navigation.nextEl.classList.add("swiper-button-disabled"),e.navigation.nextEl.setAttribute("disabled",!0)):(e.navigation.nextEl.classList.remove("swiper-button-disabled"),e.navigation.nextEl.removeAttribute("disabled"))}swiper.on("slideChange",()=>updateNavigation(swiper)),updateNavigation(swiper);
//# sourceMappingURL=swiper.js.map