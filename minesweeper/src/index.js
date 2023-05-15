// create basic html 
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

// create cells in the game field

let cells_number = 10;
let mins_number = 6;

function createField (cells, mins) {

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
            }
            row.push(item);
        }
        field.push(row);
    }

    return field;

}

let field = createField(cells_number, mins_number);
field.forEach(row =>{
    row.forEach(item => {
        GAME_FIELD.appendChild(item.cell);
    })
})


