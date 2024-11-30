const swiper = new Swiper('.swiper', {
	centeredSlides: true,
	slidesPerView: 3,
	spaceBetween: 50,
	direction: 'horizontal',
	initialSlide: 1,
	speed: 600,
	preventClicks: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		850: {
			slidesPerView: 2,
			centeredSlides: false
		},
		1280: {
			slidesPerView: 3,

		},
	},
});


function updateNavigation(swiperInstance) {
	const totalSlides = swiperInstance.slides.length;
	const activeIndex = swiperInstance.activeIndex;


	if (activeIndex <= 1) {
		swiperInstance.navigation.prevEl.classList.add('swiper-button-disabled');
		swiperInstance.navigation.prevEl.setAttribute('disabled', true);
	} else {
		swiperInstance.navigation.prevEl.classList.remove('swiper-button-disabled');
		swiperInstance.navigation.prevEl.removeAttribute('disabled');
	}

	if (activeIndex >= totalSlides - 2) {
		swiperInstance.navigation.nextEl.classList.add('swiper-button-disabled');
		swiperInstance.navigation.nextEl.setAttribute('disabled', true);
	} else {
		swiperInstance.navigation.nextEl.classList.remove('swiper-button-disabled');
		swiperInstance.navigation.nextEl.removeAttribute('disabled');
	}
}
swiper.on('slideChange', () => updateNavigation(swiper));

updateNavigation(swiper);


