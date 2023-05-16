// create basic html containers
const BODY = document.querySelector('body');
const GAME_CONTAINER = document.createElement('div');
GAME_CONTAINER.classList.add('game-container');
BODY.appendChild(GAME_CONTAINER);

const GAME_MENU = document.createElement('div');
GAME_MENU.classList.add('game-menu');
GAME_CONTAINER.appendChild(GAME_MENU);

const GAME_FIELD = document.createElement('div');
GAME_FIELD.classList.add('game-field');
GAME_CONTAINER.appendChild(GAME_FIELD);

// create cells in the game-field

let cells_number = 10;
let mines_number = 10;

GAME_FIELD.style.setProperty('--size', cells_number)

function createField (cells) {

    let field = [];

    for(let i = 0; i < cells; i++){
        let row = [];
        for(let j = 0; j < cells; j++){
            let cell = document.createElement('div');
            cell.classList.add('game-field__item');
            let item = {
                cell,
                i,
                j,
                mine: false,
            }
            row.push(item);
        }
        field.push(row);
    }

    return field;

}

let field = createField(cells_number);
field.forEach(row =>{
    row.forEach(item => {
        GAME_FIELD.appendChild(item.cell);
    })
})

// generate mines positions 

const getRandomPosition = (num) => Math.floor(Math.random() * num);

function createMinesPosition(cells, mines){
    let positions = [];
    while(positions.length <= mines){
        let position = {
            row: getRandomPosition(cells),
            line: getRandomPosition(cells),
        }
        if(!positions.includes(position)){
            positions.push(position);
        }
    }

    return positions;
}

// add mines after first click in the field

let game_cell = document.querySelectorAll('.game-field__item');
let cell_opened = document.querySelectorAll('.item_opened');
let cell_mine = document.querySelectorAll('..item_mine');
let cell_number = document.querySelectorAll('.item_number');
let cell_flagged = document.querySelectorAll('.item_flagged');

const generateMinesOnField = () => {
    let positions = createMinesPosition(cells_number, mines_number);
    field.forEach(row =>{
        row.forEach(item => {
            positions.forEach(position =>{
                if (item.i === position.row && item.j === position.line) {
                    item.mine = true;
                  }
            })
        })
    })
}

field.forEach(row =>{
    row.forEach(item => {
       item.cell.addEventListener('contextmenu', e => {
        e.preventDefault();
       })
       item.cell.addEventListener('click', e => {
        
       })
    })
})





