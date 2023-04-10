/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');
let main = document.querySelector('body');
let navigation = document.querySelector('.nav');
let header = document.querySelector('.header__content');

menuBtn.addEventListener('click', function () {
    header.classList.toggle('open');
})

/* burger menu end */

// Константы
const BTN_RIGHT = document.getElementById('next-button');
const BTN_LEFT = document.getElementById('prev-button');
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

    const petsNum = {
      Jennifer: cards[0],
      Sophia: cards[1],
      Woody: cards[2],
      Scarlett: cards[3],
      Katrine: cards[4],
      Timmy: cards[5],
      Freddie: cards[6],
      Charly: cards[7],
    };

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

  let collection = {
    pastCards: pastCards,
    currCards: currCards,
    nextCards: nextCards,
  };

  return collection;
};

console.log(init())

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

let currentIndex = 0;

function createCards(pet) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}" class="pets-photo">
        <h2 class="pets-title">${pet.name}</h2>
        <button class="button__learn-more">Learn more</button>
      `;
    return card;
  }

//left slider button desctop and tablet 
const moveLeft = function () {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
}

BTN_LEFT.addEventListener('click', moveLeft);

//right slider button desctop and tablet

const moveRight = function () {
    CAROUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener('click', moveRight);
    BTN_LEFT.removeEventListener('click', moveLeft);
}

BTN_RIGHT.addEventListener('click', moveRight);

// slider

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
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
});
let changedSlides;
for(let i = 0; i < 3; i++){
    const newCard = createCardTemplate(cards[currentIndex + i]); // передаем объект из массива allCards
    changedSlides.appendChild(newCard); // исправлено на changedSlides
}


/* slider ends */

/* modal starts */

const modal = document.querySelector('.modal__cover');
const openButtons = document.querySelectorAll('.card');

openButtons.forEach((openButton) => {
  openButton.addEventListener('click', () => {
    modal.classList.add('open');
  });
});

const closeButton = document.querySelector('.modal__button');
closeButton.addEventListener('click', () => {
  modal.classList.remove('open');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('open');
  }
});

let modal__image = document.querySelector('.modal__image');
let modal__name = document.querySelector('.modal__name');
let modal__type = document.querySelector('.modal__type-breed');
let modal__description = document.querySelector('.modal__description')
let age = document.querySelector('.age');
let innoculations = document.querySelector('.innoculations');
let diseases = document.querySelector('.diseases');

let index;

document.addEventListener("click", (e) => {
  if(e.target.closest(".card") !== null){
    generateModal(e.target.closest(".card"));
    modal.classList.add('open');
  } else {
    modal.classList.remove('open');
  }
});

function generateModal (id) {
  modal__image.src = petsNum[id].img;
  modal__name.innerHTML = petsNum[id].name;
  modal__type.innerHTML = petsNum[id].type + " " + petsNum[id].breed;
  modal__description.innerHTML = petsNum[id].description;
  age.innerHTML = petsNum[id].age;
  innoculations.innerHTML = petsNum[id].inoculations;
  diseases.innerHTML = petsNum[id].diseases;
  parasites.innerHTML = petsNum[id].parasites;
}

/* modal ends */