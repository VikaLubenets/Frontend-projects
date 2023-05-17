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

function createFieldArr (cells) {

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

let generateField = () => {
    let field = createFieldArr(cells_number);
    field.forEach(row =>{
        row.forEach(item => {
            GAME_FIELD.appendChild(item.cell);
        })
    })
}

generateField();


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

const flagOnCell = () => {
    //Flagged cells are unopened cells marked by 
    //the player to indicate a potential mine location; 
    //some implementations make flagged cells inoperable 
    //to reduce the risk of uncovering a suspected mine.
};

const getNumberOfMines = (field, row, line) => {
    let count = 0;

    for(let i = row - 1; i <= row + 1; i++){
        for(let j = line - 1; j <= line + 1; j++){
            if(i >= 0 && j >= 0 && i < field.length && j < field.length){
                if(field[i][j].mine){
                    count++;
                }
            }
        }
    }

    return count;
};

const showMines = (field) = {
    
};

const gameOver = () => {
    let text = document.createElement('div');
    text.textContent = 'Game is over! Try again';
    text.classList.add('text');
    BODY.appendChild(text);
    showMines(field);
};

const openCell = (item) => {

    if(item.mine){
        gameOver();
    } else {

        let numberOfMines = getNumberOfMines(field, item.i, item.j);
        item.cell.classList.add('item_opened');
        if(numberOfMines > 0){
            item.cell.textContent = numberOfMines;
        }

    }



    //A player selects a cell to open it.
    //If a player opens a mined cell, the game ends in a loss.
    //Otherwise, the opened cell displays either a number, 
    //indicating the number of mines diagonally and/or adjacent to it, 
    //or a blank tile (or "0"), 
    //and all adjacent non-mined cells will automatically be opened. 
};

// click on cell

field.forEach(row =>{
    row.forEach(item => {
       item.cell.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.flagOnCell();
       })
       item.cell.addEventListener('click', e => {
        e.openCell(item);
        generateMinesOnField();
       })
    })
})





