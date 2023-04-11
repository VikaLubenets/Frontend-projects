/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');

let header = document.querySelector('.header');

menuBtn.addEventListener('click', function(){
	header.classList.toggle('open');
})


/* burger menu end */

/* modal start */
let cards = [];
const modal__cover = document.querySelector('.modal__cover');
const closeButton = document.querySelector('.modal__button');
const openButton = document.querySelectorAll('.card');

async function fetchPets() {
  const response = await fetch('../../assets/pets.json');
  const data = await response.json();
  // Добавление всех карточек в массив cards
  cards = data;
}

async function generateModal (id) {
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

openButton.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.closest('.card').id.split('-')[1];
    generateModal(id);
  });
});

const closeModal = (e) => {
  if (e.target === modal__cover || e.target.classList.contains('modal__button')) {
    modal__cover.classList.remove('open');
  }
};

modal__cover.addEventListener('click', closeModal);
/* modal start */