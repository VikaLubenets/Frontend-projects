/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');
const body = document.querySelector('body');
let header = document.querySelector('.header');
const cover = document.querySelector('.cover');

menuBtn.addEventListener('click', function () {
	header.classList.toggle('open');
	if (header.classList.contains('open')) {
		body.style.overflow = 'hidden';
	} else {
		body.style.overflow = 'initial';
	}
})

const closeBurger = (e) => {
	if (e.target === cover) {
		header.classList.toggle('open');
		if (header.classList.contains('open')) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'initial';
		}
	}
};

cover.addEventListener('click', closeBurger);


/* burger menu end */

/* modal start */
let cards = [];
const modal__cover = document.querySelector('.modal__cover');
const closeButton = document.querySelector('.modal__button');
const openButton = document.querySelectorAll('.card');
let next_btn = document.querySelector('.next');
let double_next_btn = document.querySelector('.double-next');
let prev_btn = document.querySelector('.prev');
let double_prev_btn = document.querySelector('.double-prev');
let allCards = [];
let cardsContainer = document.querySelector('.cards-container');
let numPage = document.querySelector('.num-page.num')


async function fetchPets() {
	const response = await fetch('../../assets/pets.json');
	const data = await response.json();
	// Добавление всех карточек в массив cards
	data.forEach(pet => cards.push(pet));
	return cards;
}

async function generateModal(id) {
	// Ожидание загрузки данных из pets.json
	await fetchPets();

	const pet = cards.find(pet => pet.id === id);
	modal__cover.classList.add('open');
	document.querySelector('.modal__image').setAttribute('src', pet.img);
	document.querySelector('.modal__name').textContent = pet.name;
	document.querySelector('.modal__type-breed').textContent = `${pet.type} - ${pet.breed}`;
	document.querySelector('.modal__description').textContent = pet.description;
	document.querySelector('.modal__text.age').textContent = pet.age;
	document.querySelector('.modal__text.innoculations').textContent = pet.inoculations;
	document.querySelector('.modal__text.diseases').textContent = pet.diseases;
	document.querySelector('.modal__text.parasites').textContent = pet.parasites;
}


	cardsContainer.addEventListener('pointerdown', (event) => {
		const target = event.target;
		if (target.classList.contains('.button__learn-more')) {
			const id = target.closest('.card').id;
			generateModal(id);
			body.style.overflow = 'hidden';
		  }
	});


const closeModal = (e) => {
	if (e.target === modal__cover || e.target.classList.contains('modal__button')) {
		modal__cover.classList.remove('open');
		body.style.overflow = 'initial';
	}
};

modal__cover.addEventListener('pointerdown', closeModal);
closeButton.addEventListener('pointerdown', closeModal);
/* modal start */

/* Pagination starts */


async function main() {

	const cards = await fetchPets();

	let petsData = [];

	function createArr() {
		let arr = [];
		for (let i = 0; i < 6; i++) {
			let tempArr = [];
			while (tempArr.length < 8) {
				let randomCard = Math.floor(Math.random() * 8);
				if (!tempArr.includes(randomCard)) {
					tempArr.push(randomCard);
				}
			}
			arr = arr.concat(tempArr)
		}

		let newArr = cards.map(card => ({
			"id": card.id,
			"name": card.name,
			"img": card.img,
		}));

		let resultArr = arr.map(index => newArr[index]);
		return resultArr;
	}

	let flattenedArray = createArr().reduce((acc, curr) => {
		return acc.concat(curr);
	}, []);

	petsData = flattenedArray;

	let currentPage = 1;
	let cardsNum = 0;
	cardsContainer.innerHTML = '';

	console.log(petsData)

	if (window.matchMedia("(max-width: 767px)").matches) {
		cardsNum = 3;
	} else if (window.matchMedia("(max-width: 1279px)").matches) {
		cardsNum = 6;
	} else {
		cardsNum = 8;
	}

	function displayList(arrData, cardsPage, page) {
		let start = cardsPage * (page - 1);
		let end = start + cardsPage;
		const paginatedData = arrData.slice(start, end);

		paginatedData.forEach((el) => {
			const card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('id', el.id);
			cardsContainer.appendChild(card);

			const image = document.createElement('img');
			image.src = el.img;
			image.classList.add('pets-photo');
			card.appendChild(image);

			const name = document.createElement('p');
			name.textContent = el.name;
			name.classList.add('pets-title');
			card.appendChild(name);

			card.addEventListener('pointerdown', () => {
				generateModal(el.id);
				body.style.overflow = 'hidden';
			  });

			const button = document.createElement('button');
			button.textContent = 'Learn more';
			button.classList.add('button__learn-more')
			card.appendChild(button);
		})
	};

	displayList(petsData, cardsNum, currentPage);

	next_btn.addEventListener('click', function () {

		if (currentPage < (48 / cardsNum)) {
			cardsContainer.innerHTML = '';
			currentPage = currentPage + 1;
			numPage.textContent = currentPage;
			displayList(petsData, cardsNum, currentPage);

			if (currentPage > 1 && currentPage < (48 / cardsNum)) {
				prev_btn.classList.add('active');
				double_prev_btn.classList.add('active');
				prev_btn.classList.remove('inactive');
				double_prev_btn.classList.remove('inactive');
				next_btn.classList.add('active');
				double_next_btn.classList.add('active');
				next_btn.classList.remove('inactive');
				double_next_btn.classList.remove('inactive');
			} else if (currentPage === 1) {
				prev_btn.classList.add('inactive');
				double_prev_btn.classList.add('inactive');
				prev_btn.classList.remove('active');
				double_prev_btn.classList.remove('active');
				next_btn.classList.add('active');
				double_next_btn.classList.add('active');
				next_btn.classList.remove('inactive');
				double_next_btn.classList.remove('inactive');
			} else {
				prev_btn.classList.add('active');
				double_prev_btn.classList.add('active');
				prev_btn.classList.remove('inactive');
				double_prev_btn.classList.remove('inactive');
				next_btn.classList.add('inactive');
				double_next_btn.classList.add('inactive');
				next_btn.classList.remove('active');
				double_next_btn.classList.remove('active');
			}
		}
	});
	prev_btn.addEventListener('click', function () {
		if (currentPage > 1) {
			cardsContainer.innerHTML = '';
			currentPage -= 1;
			numPage.textContent = currentPage;
			displayList(petsData, cardsNum, currentPage);
			if (currentPage > 1 && (48 / cardsNum)) {
				prev_btn.classList.add('active');
				double_prev_btn.classList.add('active');
				prev_btn.classList.remove('inactive');
				double_prev_btn.classList.remove('inactive');
				next_btn.classList.add('active');
				double_next_btn.classList.add('active');
				next_btn.classList.remove('inactive');
				double_next_btn.classList.remove('inactive');
			} else if (currentPage === 1) {
				prev_btn.classList.add('inactive');
				double_prev_btn.classList.add('inactive');
				prev_btn.classList.remove('active');
				double_prev_btn.classList.remove('active');
				next_btn.classList.add('active');
				double_next_btn.classList.add('active');
				next_btn.classList.remove('inactive');
				double_next_btn.classList.remove('inactive');
			} else {
				prev_btn.classList.add('active');
				double_prev_btn.classList.add('active');
				prev_btn.classList.remove('inactive');
				double_prev_btn.classList.remove('inactive');
				next_btn.classList.add('inactive');
				double_next_btn.classList.add('inactive');
				next_btn.classList.remove('active');
				double_next_btn.classList.remove('active');
			}
		}
	});

	double_next_btn.addEventListener('click', function () {
		if (window.matchMedia("(max-width: 767px)").matches) {
			currentPage = 16;
		} else if (window.matchMedia("(max-width: 1279px)").matches) {
			currentPage = 8;
		} else {
			currentPage = 6;
		}
			cardsContainer.innerHTML = '';
			numPage.textContent = currentPage;
			displayList(petsData, cardsNum, currentPage);

			prev_btn.classList.add('active');
			double_prev_btn.classList.add('active');
			prev_btn.classList.remove('inactive');
			double_prev_btn.classList.remove('inactive');
			next_btn.classList.add('inactive');
			double_next_btn.classList.add('inactive');
			next_btn.classList.remove('active');
			double_next_btn.classList.remove('active');
		
	});

	double_prev_btn.addEventListener('click', function () {
		if (window.matchMedia("(max-width: 767px)").matches) {
			currentPage = 1;
		} else if (window.matchMedia("(max-width: 1279px)").matches) {
			currentPage = 1;
		} else {
			currentPage = 1;
		}
		cardsContainer.innerHTML = '';
		numPage.textContent = currentPage;
		displayList(petsData, cardsNum, currentPage);
		
		prev_btn.classList.add('inactive');
		double_prev_btn.classList.add('inactive');
		prev_btn.classList.remove('active');
		double_prev_btn.classList.remove('active');
		next_btn.classList.add('active');
		double_next_btn.classList.add('active');
		next_btn.classList.remove('inactive');
		double_next_btn.classList.remove('inactive');

	});

}

main();


/* Pagination ends */