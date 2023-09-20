/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');
let main = document.querySelector('body');
let navigation = document.querySelector('.nav');
let header = document.querySelector('.header__content');
const body = document.querySelector('body');
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

const CAROUSEL = document.querySelector('.carousel');
let orderedList = []; // общий массив для прошлых, текущих и следующих карточек в зависимости от генерации
let resultArr = []; // массив для передачи в функцию генерации html карусели
let cards = []; // массив со всеми доступными карточками
let pastCards = []; // массив для прошлых карточек
let currCards = []; // массив для активных карточек (текущих)
let nextCards = []; // массив для следующего слайда

fetch('../../assets/pets.json')
  .then(response => response.json())
  .then(data => { data.forEach(pet => cards.push(pet))
    
    init();
    forward();
    backward();
    changeToBackward();
    changeToForward();

    const modal__cover = document.querySelector('.modal__cover');
    const openButton = document.querySelectorAll('.card');
    const body = document.querySelector('body');
    
    function generateModal (id) {
      const pet = cards.find(pet => pet.id === id);
      modal__cover.classList.add('open');
      document.querySelector('.modal__image').setAttribute('src', pet.img);
      document.querySelector('.modal__name').textContent = pet.name;
      document.querySelector('.modal__type-breed').textContent = `${pet.type} ${pet.breed}`;
      document.querySelector('.modal__description').textContent = pet.description;
      document.querySelector('.modal__text.age').textContent = pet.age;
      document.querySelector('.modal__text.innoculations').textContent = pet.inoculations;
      document.querySelector('.modal__text.diseases').textContent = pet.diseases;
      document.querySelector('.modal__text.parasites').textContent = pet.parasites;
    }
    
    openButton.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.closest(".card").id;
        generateModal(id);
        body.style.overflow = 'hidden' 
      });
    });
    
    const closeModal = (e) => {
      if (e.target === modal__cover || e.target.classList.contains('modal__button')) {
        modal__cover.classList.remove('open');
        body.style.overflow = 'initial'; 
      }
    };
    
    modal__cover.addEventListener('click', closeModal);
    
  });

/* modal ends */

/* slider start */


// инициализация

function init () {
  // генерируем массив nextCards
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  }

  // перемещаем значения из nextCards (попутно его обнуляя) в currCards
  currCards = nextCards;
  nextCards = [];

  // генерируем массив nextCards (помним про проверку на наличие значений в currCards)
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  }

  // перемещаем значения из currCards (попутно его обнуляя) в pastCards
  pastCards = currCards;
  currCards = [];

  // перемещаем значения из nextCards (попутно его обнуляя) в currCards
  currCards = nextCards;
  nextCards = [];

  // генерируем массив nextCards (помним про проверку на наличие значений в currCards)
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  } 

  orderedList = [...pastCards, ...currCards, ...nextCards];
  
  return orderedList;
};

init();

// Прокрутка вправо

function forward(){
  // 1. обнуляем массив pastCards
  pastCards = [];

  // 2. перемещаем значения из currCards (попутно его обнуляя) в pastCards
  pastCards = currCards;
  currCards = [];

  // 3. перемещаем значения из nextCards (попутно его обнуляя) в currCards
  currCards = nextCards;
  nextCards = [];

  // 4. генерируем массив nextCards (помним про проверку на наличие значений в currCards)
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  }

  // возвращаем объект с массивами
  orderedList = [...pastCards, ...currCards, ...nextCards];
  
  return orderedList;

}

//Смена направления назад
function changeToBackward() {
  // Меняем местами значения в массивах pastArr и currArr
  let temp = pastCards;
  pastCards = currCards;
  currCards = temp;

  // Обнуляем значения массива nextArr
  nextCards = [];

  // Генерируем массив nextArr (помним про проверку на наличие значений в currArr)
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  }

  orderedList = [...pastCards, ...currCards, ...nextCards];
  
  return orderedList;
}

//влево

function backward(){
  // 1. обнуляем массив nextCards
  nextCards = [];

  // 2. перемещаем значения из currCards (попутно его обнуляя) в nextCards
  nextCards = currCards;
  currCards = [];

  // 3. перемещаем значения из pastCards (попутно его обнуляя) в currCards
  currCards = pastCards;
  pastCards = [];

  // 4. генерируем массив pastCards (помним про проверку на наличие значений в currCards)
  while (pastCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !pastCards.includes(randomCard)) {
      pastCards.push(randomCard);
    }
  }

  // возвращаем объект с массивами
  orderedList = [...pastCards, ...currCards, ...nextCards];
  
  return orderedList;
}

// смена направления вправо
function changeToForward(){
  // Меняем местами значения в массивах pastArr и currArr
  let temp = nextCards;
  pastCards = currCards;
  currCards = temp;

  // Обнуляем значения массива pastArr
  nextCards = [];

  // Генерируем массив nextArr (помним про проверку на наличие значений в currArr)
  while (nextCards.length < 3) {
    let randomCard = Math.floor(Math.random() * 8);
    if (!currCards.includes(randomCard) && !nextCards.includes(randomCard)) {
      nextCards.push(randomCard);
    }
  }

  orderedList = [...pastCards, ...currCards, ...nextCards];
  
  return orderedList;

}


// Генерация html
let ITEM_LEFT = document.querySelector('.left-cards');
let ITEM_RIGHT = document.querySelector('.right-cards');
let ITEM_ACTIVE = document.querySelector('.active-cards');

//  function createCarousel(orderedList) {
//   CAROUSEL.innerHTML += createCard(ordeperedList);
// }


function createCard(orderedList) {
  
  let newArr = [
    {
      "id": "0",
      "name": "Jennifer",
      "img": "../../assets/images/jennifer.png",
    },
    {
      "id": "1",
      "name": "Sophia",
      "img": "../../assets/images/sophia.png",
    },
    {
      "id": "2",
      "name": "Woody",
      "img": "../../assets/images/woody.png",
    },
    {
      "id": "3",
      "name": "Scarlett",
      "img": "../../assets/images/scarlett.png",
    },
    {
      "id": "4",
      "name": "Katrine",
      "img": "../../assets/images/katrine.png",
    },
    {
      "id": "5",
      "name": "Timmy",
      "img": "../../assets/images/timmy.png",
    },
    {
      "id": "6",
      "name": "Freddie",
      "img": "../../assets/images/freddie.png",
    },
    {
      "id": "7",
      "name": "Charly",
      "img": "../../assets/images/charly.png",
    }
  ]

  resultArr = orderedList.map(index => newArr[index]);

  CAROUSEL.innerHTML = "";

    resultArr.forEach((cardData) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('id', cardData.id);
      CAROUSEL.appendChild(card);
  
      const image = document.createElement('img');
      image.src = cardData.img;
      image.classList.add('pets-photo');
      card.appendChild(image);
  
      const name = document.createElement('p');
      name.textContent = cardData.name;
      name.classList.add('pets-title');
      card.appendChild(name);
  
      const button = document.createElement('button');
      button.textContent = 'Learn more';
      button.classList.add('button__learn-more')
      card.appendChild(button);

      card.addEventListener('click', () => {
				generateModal(cardData.id);
				body.style.overflow = 'hidden';
			  });
    });

    return CAROUSEL.innerHTML;
};

createCard(orderedList);


// slider

const BTN_RIGHT = document.querySelectorAll('.next-button');
const BTN_LEFT = document.querySelectorAll('.prev-button');
let BTN_RIGHT_clickCounter = 0;
let BTN_LEFT_clickCounter = 0;

// обрабатываем клик на кнопке "влево"

BTN_LEFT.forEach(button => button.addEventListener('click', function(){
  backward();
  createCard(orderedList);
}));

BTN_RIGHT.forEach(button => button.addEventListener('click', function(){
  if (BTN_LEFT_clickCounter === 1) {
    // вызываем функцию со старыми значениями карточек
    changeToBackward()
    createCard(orderedList);
    // сбрасываем значение счетчика
    BTN_LEFT_clickCounter = 0;
  } else {
    forward();
    createCard(orderedList);
  }
  BTN_RIGHT_clickCounter++;
}));




//left slider button desctop and tablet 

// let moveLeft = function () {
//   CAROUSEL.classList.add("transition-left");
//   BTN_LEFT.forEach(button => button.removeEventListener('click', moveLeft));
//   BTN_RIGHT.forEach(button => button.removeEventListener('click', moveRight));
// }

// BTN_LEFT.forEach(button => button.addEventListener('click', moveLeft));

// // //right slider button desctop and tablet

// const moveRight = function () {
//   CAROUSEL.classList.add("transition-right");
//   BTN_RIGHT.forEach(button => button.removeEventListener('click', moveRight));
//   BTN_LEFT.forEach(button => button.removeEventListener('click', moveLeft));
// }

// BTN_RIGHT.forEach(button => button.addEventListener('click', moveRight));

// CAROUSEL.addEventListener("animationend", function (animationEvent) {
//     let changedSlides;
//     if (animationEvent.animationName === 'move-left') {
//         CAROUSEL.classList.remove("transition-left");
//         changedSlides = ITEM_LEFT;
//         ITEM_ACTIVE.forEach((item, index) => {
//           item.innerHTML = ITEM_LEFT[index].innerHTML;
//         });
//       } else if (animationEvent.animationName === 'move-right') {
//         CAROUSEL.classList.remove("transition-right");
//         changedSlides = ITEM_RIGHT;
//         ITEM_ACTIVE.forEach((item, index) => {
//           item.innerHTML = ITEM_RIGHT[index].innerHTML;
//         });
//     }

// });


/* slider ends */
