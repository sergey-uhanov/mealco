const closePopupButton = document.getElementById('closePopup');
const popup = document.getElementById('popup');


function openPopup() {
	popup.classList.add('active');
	popup.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

function closePopup() {
	popup.classList.remove('active');
	popup.classList.add('hidden');
	document.body.style.overflow = 'visible';
}
closePopupButton.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => {
	if (e.target === popup) {
		closePopup();
	}
});


const form = document.querySelector('.popup-form'); // Форма
const inputs = form.querySelectorAll('.popup-form__input'); // Все input
const submitButton = document.getElementById('popupSubmitBtn'); // Кнопка Submit
const popupContent = document.querySelector('.popup-content'); // Контейнер для содержимого
const popupWrapper = document.getElementById('popupWrapper'); // Обертка для popup
const successMassage = document.getElementById('popupSuccess'); // Сообщение об успешной отправке


function validateForm() {
	const allFieldsFilled = Array.from(inputs).every((input) => input.value.trim() !== '');
	submitButton.disabled = !allFieldsFilled; // Управляем состоянием кнопки
}


function simulateDataSubmission(formData) {
	return new Promise((resolve) => {
		console.log('Отправка данных:', Object.fromEntries(formData)); // Логируем данные формы
		setTimeout(() => resolve('Данные успешно отправлены!'), 5000); // Симуляция задержки отправки
	});
}


form.addEventListener('submit', async (event) => {
	event.preventDefault();
	submitButton.disabled = true;
	submitButton.textContent = 'Отправка...';

	try {
		form.classList.add('hidden');
		successMassage.classList.remove('hidden');
		successMassage.classList.add('active');




		const closePopupSuccessButton = document.getElementById('closePopupSuccess');
		closePopupSuccessButton.addEventListener('click', () => {
			popup.classList.remove('active');
			popup.classList.add('hidden');
			document.body.style.overflow = 'visible';
			inputs.forEach((input) => {
				input.value = '';
			});

			form.classList.remove('hidden');
			successMassage.classList.remove('active');
			successMassage.classList.add('hidden');

		});
	} catch (error) {
		console.error('Ошибка при отправке данных:', error);
		alert('Произошла ошибка при отправке данных. Попробуйте ещё раз.');
	} finally {

		submitButton.disabled = false;
		submitButton.textContent = 'Submit';
	}
});


inputs.forEach((input) => {
	input.addEventListener('input', validateForm);
});
validateForm();


document.addEventListener('DOMContentLoaded', () => {
	const burgerButton = document.getElementById('burgerMenu');
	const mobileNav = document.getElementById('mobileNav');

	burgerButton.addEventListener('click', () => {
		mobileNav.classList.toggle('menu--open');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const burgerButton = document.getElementById('burgerMenu');

	burgerButton.addEventListener('click', () => {
		burgerButton.classList.toggle('header__burger-btn--open');
	});
});




function pushBack() {
	if (document.referrer) {

		window.history.back();
	} else {

		window.location.href = 'index.html';
	}
}


//tab menu
document.addEventListener('DOMContentLoaded', () => {
	const controls = document.querySelectorAll('.menu__control');
	const groups = document.querySelectorAll('.menu__group');

	controls.forEach(control => {
		control.addEventListener('click', () => {
			const group = control.dataset.group;


			controls.forEach(btn => btn.classList.remove('active'));
			control.classList.add('active');


			if (group === 'all') {
				groups.forEach(item => item.classList.add('active'));
			} else {
				groups.forEach(item => {
					item.classList.toggle('active', item.dataset.group === group);
				});
			}
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const currentPath = window.location.pathname.split('/').pop();
	const links = document.querySelectorAll('.header__link');

	links.forEach(link => {
		if (link.getAttribute('href') === currentPath) {
			link.classList.add('active');
		}
	});
});