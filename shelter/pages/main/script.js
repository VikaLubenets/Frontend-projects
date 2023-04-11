/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');
let main = document.querySelector('body');
let navigation = document.querySelector('.nav');
let header = document.querySelector('.header__content');
const body = document.querySelector('body');

menuBtn.addEventListener('click', function () {
    header.classList.toggle('open');
    if (header.classList.contains('open')) {
      body.style.overflow = 'hidden';
      } else {
      body.style.overflow = 'initial';
      }
})

/* burger menu end */

const CAROUSEL = document.querySelector('.carousel');

/* slider start */

let cards = []; // массив со всеми доступными карточками
let pastCards = []; // массив для прошлых карточек
let currCards = []; // массив для активных карточек (текущих)
let nextCards = []; // массив для следующего слайда

fetch('../../assets/pets.json') // добавила данные из pets.json
  .then(response => response.json())
  .then(data => {
    // Добавление всех карточек в массив allCards
    data.forEach(pet => cards.push(pet));
    init();
    cards = data;

    const ID = {
      Jennifer: cards[0],
      Sophia: cards[1],
      Woody: cards[2],
      Scarlett: cards[3],
      Katrine: cards[4],
      Timmy: cards[5],
      Freddie: cards[6],
      Charly: cards[7],
    };
    
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

// инициализация

const init = () => {
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

  cards.forEach(pet => {
    const card = createCard(pet);
    CAROUSEL.appendChild(card);
  });

  return {
    pastCards: pastCards,
    currCards: currCards,
    nextCards: nextCards,
  };
};

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
  return {
    pastCards: pastCards,
    currCards: currCards,
    nextCards: nextCards,
  };

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

  return {
    nextCards: nextCards,
    currCards: currCards,
    pastCards: pastCards
  };
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
  return {
    pastCards: pastCards,
    currCards: currCards,
    nextCards: nextCards,
  };
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

  return {
    nextCards: nextCards,
    currCards: currCards,
    pastCards: pastCards
  };

}

// Генерация html
let ITEM_LEFT = document.querySelector('.left-cards');
let ITEM_RIGHT = document.querySelector('.right-cards');
let ITEM_ACTIVE = document.querySelector('.active-cards');
let currentIndex = 0;

cards = [...pastCards, ...currCards, ...pastCards];

function createCard(pet) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', pet.id);

  const image = document.createElement('img');
  image.src = pet.img;
  image.classList.add('pets-photo');
  card.appendChild(image);

  const name = document.createElement('p');
  name.textContent = pet.name;
  name.classList.add('pets-title');
  card.appendChild(name);

  const button = document.createElement('button');
  button.textContent = 'Learn more';
  button.classList.add('button__learn-more')
  card.appendChild(button)
  
  return card;
  }

// slider

const BTN_RIGHT = document.querySelectorAll('.next-button');
const BTN_LEFT = document.querySelectorAll('.prev-button');

// // обрабатываем клик на кнопке "влево"
// function onBackwardButtonClick() {
//   backward();
//   const { pastCards, currCards, nextCards } = backward();
//   updateSlider(pastCards, currCards, nextCards);
// }

// // обрабатываем клик на кнопке "вправо"
// function onForwardButtonClick() {
//   forward()
//   const { pastCards, currCards, nextCards } = forward();
//   updateSlider(pastCards, currCards, nextCards);
// }

// // отображаем текущие карточки в слайдере и вызываем функцию changeToBackward() или changeToForward()
// function updateSlider(pastCards, currCards, nextCards) {
//   const sliderHtml = `
//     <div class="card left-cards">${pastCards[0]}</div>
//     <div class="card left-cards">${pastCards[1]}</div>
//     <div class="card left-cards">${pastCards[2]}</div>
//     <div class="card active-cards">${currCards[0]}</div>
//     <div class="card active-cards">${currCards[1]}</div>
//     <div class="card active-cards">${currCards[2]}</div>
//     <div class="card right-cards">${nextCards[0]}</div>
//     <div class="card right-cards">${nextCards[1]}</div>
//     <div class="card right-cards">${nextCards[2]}</div>
//   `;
//   slider.innerHTML = sliderHtml;
// }

// function generateCarousel() {
//   const pastCardsHtml = pastCards.map(cardIndex => `<div class="card">${cardIndex}</div>`).join('');
//   const currCardsHtml = currCards.map(cardIndex => `<div class="card">${cardIndex}</div>`).join('');
//   const nextCardsHtml = nextCards.map(cardIndex => `<div class="card">${cardIndex}</div>`).join('');
  
//   const sliderContainer = slider.querySelector('.carousel');
//   sliderContainer.innerHTML = pastCardsHtml + currCardsHtml + nextCardsHtml;
// }

// prevBtn.addEventListener('click', () => {
//   changeToBackward();
//   generateSliderCards();
// });

// nextBtn.addEventListener('click', () => {
//   changeToForward();
//   generateSliderCards();
// });

// //left slider button desctop and tablet 
const moveLeft = function () {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.forEach(button => button.removeEventListener('click', moveLeft));
  BTN_RIGHT.forEach(button => button.removeEventListener('click', moveRight));
}

BTN_LEFT.forEach(button => button.addEventListener('click', moveLeft));

// //right slider button desctop and tablet

const moveRight = function () {
  CAROUSEL.classList.add("transition-right");
  BTN_RIGHT.forEach(button => button.removeEventListener('click', moveRight));
  BTN_LEFT.forEach(button => button.removeEventListener('click', moveLeft));
}

BTN_RIGHT.forEach(button => button.addEventListener('click', moveRight));

CAROUSEL.addEventListener("animationend", function (animationEvent) {
    let changedSlides;
    if (animationEvent.animationName === 'move-left') {
        CAROUSEL.classList.remove("transition-left");
        changedSlides = ITEM_LEFT;
        ITEM_ACTIVE.forEach((item, index) => {
          item.innerHTML = ITEM_LEFT[index].innerHTML;
        });
      } else if (animationEvent.animationName === 'move-right') {
        CAROUSEL.classList.remove("transition-right");
        changedSlides = ITEM_RIGHT;
        ITEM_ACTIVE.forEach((item, index) => {
          item.innerHTML = ITEM_RIGHT[index].innerHTML;
        });
    }

});


/* slider ends */
