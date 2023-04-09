// add pets json

fetch("../../assets/pets.json")
  .then((res) => res.json())
  .then((list) => {
    pets = list;

    const petId = {
        Sophia: pets[0],
        Timmy: pets[1],
        Charly: pets[2],
        Katrine: pets[3],
        Jennifer: pets[4],
        Woody: pets[5],
        Scarlett: pets[6],
        Freddie: pets[7],
      };
})

/* burger menu start */

let menuBtn = document.querySelector('.burger-menu');

let main = document.querySelector('body');

let navigation = document.querySelector('.nav');

let header = document.querySelector('.header__content');

menuBtn.addEventListener('click', function () {
    header.classList.toggle('open');
})


/* burger menu end */

/* slider start */

let cards = [];

const BTN_RIGHT = document.getElementById('next-button');
const BTN_LEFT = document.getElementById('prev-button');
const CARAUSEL = document.querySelector('.carausel');
const ITEM_LEFT = [...document.querySelectorAll('.left-card')];
const ITEM_RIGHT = [...document.querySelectorAll('.right-card')];
const ITEM_ACTIVE = [...document.querySelectorAll('.active-card')];


const createCards = () => {
    while(cards.length < 3){
        let card = Math.floor(Math.random() * 8);
        if(!cards.includes(card)){
            cards.push(card)
        }
    }
    
    let card = document.createElement("div");
    card.classList.add('card');
    card.innerHTML = `<img class='pets-photo' src=${pets[num].img} alt='pets-photo'>
                        <p class='pets-title'>${pets[num].name}</p>
                        <button class='button__learn-more'>Learn more</button>`;
    return card;
}

//left slider button desctop and tablet 
const moveLeft = function() {
    CARAUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
 }

BTN_LEFT.addEventListener('click', moveLeft);

//right slider button desctop and tablet

const moveRight = function() {
    CARAUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener('click', moveRight);
    BTN_LEFT.removeEventListener('click', moveLeft);
 }

BTN_RIGHT.addEventListener('click', moveRight);

// slider

CARAUSEL.addEventListener("animationend", function(animationEvent){
    let changedSlides;
    if(animationEvent.animationName === 'move-left') {
        CARAUSEL.classList.remove("transition-left");
        changedSlides = ITEM_LEFT;
        ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
    } else if (animationEvent.animationName === 'move-right') {
        CARAUSEL.classList.remove("transition-right");
        changedSlides = ITEM_RIGHT;
        ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
    }

    changedSlides.innerHTML = "";

    for(let i = 0; i < 3; i++){
        const card = createCardTemplate();
        changedSlides.appendChild(card);
    }

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
 })

/* slider start */



