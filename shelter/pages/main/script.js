/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');
let main = document.querySelector('body');
let navigation = document.querySelector('.nav');
let header = document.querySelector('.header__content');

menuBtn.addEventListener('click', function () {
    header.classList.toggle('open');
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
    forward();
    changeToBackward();
    backward();
    changeToBackward();
    
    
  const popupClose = (evt) => {
    evt.preventDefault()
    darkScreen.style.display = 'none'
    popup.classList.remove('popup--active')
    document.body.style.overflowY = 'visible'
  }

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popupClose(evt)
    }
  });

document.addEventListener("click", (e) => {
  if (e.target.parentNode.classList.contains(".card")) {
    const petId = e.target.parentNode.getAttribute('id')
    const pet = json.find(el => el.id)
    generateModal(pet);
    modal__cover.classList.add("open");
  } else {
    if (
      e.target.classList[1] === "open" ||
      e.target.classList[0] === "modal__button"
    ) {
      modal__cover.classList.remove("open");
    }
  }
});

function generateModal (pet) {
 
  const modal = document.createElement('section');
  modal.classList.add('modal');
  modal__cover.appendChild(modal);

  const modal__image = document.createElement('img');
  modal__image.classList.add('modal__image');
  modal__image.src = pet.img;
  modal.appendChild(modal__image);

  const modal__content = document.createElement('div');
  modal__content.classList.add('modal__content');
  modal.appendChild(modal__content);

  const modal__name = document.createElement('h3');
  modal__name.classList.add('modal__name');
  modal__name.textContent = pet.name;
  modal__content.appendChild(modal__name);

  const modal__type = document.createElement('p');
  modal__type.classList.add('modal__type-breed');
  modal__type.textContent = pet.type + " " + pet.breed;
  modal__content.appendChild(modal__type);
  
  const modal__description = document.createElement('p');
  modal__description.classList.add('modal__description');
  modal__description.textContent = pet.description;
  modal__content.appendChild(modal__description);

  const modal__list = document.createElement('ul');
  modal__list.classList.add('modal__list');
  modal__content.appendChild(modal__list);

  const age = document.createElement('li');
  age.classList.add('modal__item');
  age.textContent = `Age: ${pet.age}`
  modal__list.appendChild(age);

  const inoculations = document.createElement('li');
  inoculations.classList.add('modal__item');
  inoculations.textContent = `Inoculations: ${pet.inoculations}`
  modal__list.appendChild(inoculations);

  const diseases = document.createElement('li');
  diseases.classList.add('modal__item');
  diseases.textContent = `Diseases: ${pet.diseases}`
  modal__list.appendChild(diseases);

  const parasites = document.createElement('li');
  parasites.classList.add('modal__item');
  parasites.textContent = `Parasites: ${pet.parasites}`
  modal__list.appendChild(parasites);

  const button = document.createElement('button');
  button.classList.add('modal__button');
  modal__content.appendChild(button);

  const icon = document.createElement('img');
  icon.classList.add('modal__icon');
  icon.src = "../../assets/images/icon_close.svg";
  button.appendChild(icon);

}


    
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

/* modal starts */

const modal__cover = document.querySelector('.modal__cover');
const closeButton = document.querySelector('.modal__button');
const openButton = document.querySelector('.card');


/* modal ends */