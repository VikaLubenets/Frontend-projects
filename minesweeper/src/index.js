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

let field = createFieldArr(cells_number);

let generateField = () => {
    field.forEach(row =>{
        row.forEach(item => {
            GAME_FIELD.appendChild(item.cell);
        })
    })
}

generateField();


// generate mines positions 

const getRandomPosition = (num) => Math.floor(Math.random() * num);

function createMinesPosition(cells, mines, firstClickItem){
    let positions = [];
    while (positions.length <= mines - 1) {
        let position = {
            row: getRandomPosition(cells),
            col: getRandomPosition(cells),
        }
        if (!positions.includes(position)) {
            if(firstClickItem.row !== position.row && firstClickItem.col !== position.col){
                positions.push(position);
            }
        }
    }

    return positions;
}

// add mines after first click in the field and open cell

let firstClick = false;

let flagged_right = 0;
let flags_used = 0;
let remaining_flags = 0;
let game_time = 0;
let game_clicks = 0;
let game_start_time;

let updateGameTime = () => {
    const currentTime = new Date().getTime();
    game_time = Math.floor((currentTime - game_start_time) / 1000);
    TIMER.textContent = game_time + "\n seconds";
};

const generateMinesOnField = (firstClickItem) => {
    game_start_time = new Date().getTime();
    let positions = createMinesPosition(cells_number, mines_number, firstClickItem);
    field.forEach(row =>{
        row.forEach(item => {
            positions.forEach(position =>{
                if (item.i === position.row && item.j === position.col) {
                    item.mine = true;
                  }
            })
        })
    })
}

const flagOnCell = (item) => {
    if (!item.cell.classList.contains('item_flagged')) {
        item.cell.classList.add('item_flagged');
        flags_used++;
        remaining_flags = mines_number - flags_used;
        FLAGS.textContent = remaining_flags + "\n mines remain";
        USED_FLAGS.textContent = flags_used + "\n flags used";
        if (item.mine) {
            flagged_right++;
            console.log(flagged_right);
        }
      } else {
        item.cell.classList.remove('item_flagged');
        flags_used--;
        remaining_flags = mines_number - flags_used;
        FLAGS.textContent = remaining_flags + "\n mines remain";
        USED_FLAGS.textContent = flags_used + "\n flags used";
        if(item.mine){
            flagged_right--;
        }
      }

    if (flagged_right === mines_number) {
        gameWin();
    }
};

const getNumberOfMines = (field, row, col) => {
    let count = 0;

    for(let i = row - 1; i <= row + 1; i++){
        for(let j = col - 1; j <= col + 1; j++){
            if(i >= 0 && j >= 0 && i < field.length && j < field.length){
                if(field[i][j].mine){
                    count++;
                }
            }
        }
    }

    return count;
};

const showMines = (field) => {
    field.forEach(row => {
      row.forEach(item => {
        if (item.mine) {
          item.cell.classList.add('item_mine');
        }
      });
    });
};

const gameOver = () => {
    let text = document.createElement('div');
    text.textContent = 'Game over. Try again';
    text.classList.add('text');
    BODY.appendChild(text);
    showMines(field);
    updateGameTime();
};

let gameWin = () => {
    let textWin = document.createElement('div');
    textWin.textContent = `Hooray! You found all mines in ${game_time} seconds and ${game_clicks} moves!`;
    textWin.classList.add('text-win');
    BODY.appendChild(textWin);
    updateGameTime();
};

let checkWinCondition = () => {
    let closedCells = 0;

    field.forEach(row => {
        row.forEach(item => {
          if (!item.cell.classList.contains('item_opened') && !item.mine) {
            closedCells++;
          }
        });
      });
    
      if (closedCells === 0) {
        gameWin();
      }

};

const openBlanckCells = (item) => {

    let {i , j} = item;

    for (let row = i - 1; row <= i + 1; row++) {
        for (let col = j - 1; col <= j + 1; col++) {
          if (row >= 0 && col >= 0 && row < field.length && col < field.length) {
            const currItem = field[row][col];
            if (!currItem.cell.classList.contains('item_opened') && !currItem.mine) {
              openCell(currItem);
            }
          }
        }
      }

}

const openCell = (item) => {

    if (!firstClick) {
        generateMinesOnField(item);
        firstClick = true;
    }

    if (item.mine) {
        gameOver();
      } else {
        let numberOfMines = getNumberOfMines(field, item.i, item.j);
        item.cell.classList.add('item_opened');
        if (numberOfMines === 0) {
           openBlanckCells(item);
        } else {
          item.cell.textContent = numberOfMines;
        }
      }

    updateGameTime();
    TIMER.textContent = game_time + "\n seconds";

    checkWinCondition();

};

// click on cell

field.forEach(row =>{
    row.forEach(item => {
       item.cell.addEventListener('contextmenu', e => {
        e.preventDefault();
        flagOnCell(item);
        updateGameTime();
        TIMER.textContent = game_time + "\n seconds";
       })
       item.cell.addEventListener('click', e => {
        if(!item.cell.classList.contains('item_flagged')){
            game_clicks++;
            GAME_CLICKS.textContent = game_clicks + "\n clicks";
            openCell(item);
            updateGameTime();
            TIMER.textContent = game_time + "\n seconds";
        }
       })
    })
})

// create game clicks and timer

const GAME_CLICKS = document.createElement('div');
GAME_CLICKS.classList.add('game-clicks');
GAME_MENU.appendChild(GAME_CLICKS);
GAME_CLICKS.textContent = game_clicks + "\n clicks";

const TIMER = document.createElement('div');
TIMER.classList.add('game-timer');
GAME_MENU.appendChild(TIMER);
TIMER.textContent = game_time + "\n seconds";

// remaining flags

const FLAGS = document.createElement('div');
FLAGS.classList.add('flags-container');
GAME_MENU.appendChild(FLAGS);
FLAGS.textContent = remaining_flags + "\n mines remain";

const USED_FLAGS = document.createElement('div');
USED_FLAGS.classList.add('flags-container');
GAME_MENU.appendChild(USED_FLAGS);
USED_FLAGS.textContent = flags_used + "\n flags used";




