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

// create levels of complexity and amount of mines

const inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');

const minesInputContainer = document.createElement('div');
minesInputContainer.classList.add('mines-input-container');

const minesInputLabel = document.createElement('label');
minesInputLabel.classList.add('label');
minesInputLabel.textContent = 'Mines total:';

const minesInput = document.createElement('input');
minesInput.type = 'range';
minesInput.min = '10';
minesInput.max = '99';
minesInput.value = '10';
minesInput.classList.add('mine-input');

const minesValue = document.createElement('div');
minesValue.classList.add('input-value');
minesValue.textContent = minesInput.value;

minesInputContainer.appendChild(minesInputLabel);
minesInputContainer.appendChild(minesInput);
minesInputContainer.appendChild(minesValue);

inputContainer.appendChild(minesInputContainer);
GAME_CONTAINER.insertBefore(inputContainer, GAME_MENU);

minesInput.addEventListener('input', function() {
    minesValue.textContent = this.value;
    mines_number = parseInt(this.value);
    generateField();
});

const levelInputContainer = document.createElement('div');
levelInputContainer.classList.add('level-input-container');

const levelInputLabel = document.createElement('label');
levelInputLabel.classList.add('label');
levelInputLabel.textContent = 'Difficulty:';

const levelInput = document.createElement('input');
levelInput.type = 'range';
levelInput.min = '10';
levelInput.step = '5';
levelInput.max = '25';
levelInput.value = '10';
levelInput.classList.add('level-input');

const levelValue = document.createElement('div');
levelValue.classList.add('input-value');
levelValue.textContent = levelInput.value;

levelInputContainer.appendChild(levelInputLabel);
levelInputContainer.appendChild(levelInput);
levelInputContainer.appendChild(levelValue);

inputContainer.appendChild(levelInputContainer);

levelInput.addEventListener('input', function() {
    levelValue.textContent = this.value;
    cells_number = parseInt(this.value);
    generateField();
});

let cells_number = parseInt(levelInput.value);
let mines_number = parseInt(minesInput.value);
// create cells in the game-field

GAME_FIELD.style.setProperty('--size', cells_number);

function createFieldArr(cells) {
    let field = [];

    for (let i = 0; i < cells; i++) {
        let row = [];
        for (let j = 0; j < cells; j++) {
            let cell = document.createElement('div');
            cell.classList.add('game-field__item');
            let item = {
                cell,
                i,
                j,
                mine: false,
                opened: false,
                flagged: false,
            };
            row.push(item);
        }
        field.push(row);
    }

    return field;
}

let field;

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
let game_clicks = 0;
let time = 0;
let minutes = 0;
let seconds = 0;

let updateGameTime = () => {
    time++;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    TIMER.innerHTML = `${minutes}:${seconds}`;
};

const generateMinesOnField = (firstClickItem) => {
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
    setInterval(updateGameTime, 1000);
    return positions;
}

const flagOnCell = (item) => {
    if (!item.cell.classList.contains('item_flagged')) {
        item.cell.classList.add('item_flagged');
        flags_used++;
        remaining_flags = mines_number - flags_used;
        FLAGS.textContent = remaining_flags;
        USED_FLAGS.textContent = flags_used;
        item.flagged = true;
        if (item.mine) {
            flagged_right++;
        }
      } else {
        item.cell.classList.remove('item_flagged');
        flags_used--;
        remaining_flags = mines_number - flags_used;
        FLAGS.textContent = remaining_flags;
        USED_FLAGS.textContent = flags_used;
        item.flagged = false;
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
    playLoseSound();
};

let gameWin = () => {
    let textWin = document.createElement('div');
    textWin.textContent = `Hooray! You found all mines in ${minutes} minutes and ${seconds} seconds and ${game_clicks} moves!`;
    textWin.classList.add('text-win');
    BODY.appendChild(textWin);
    playWinSound();
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
        item.opened = true;
        if (numberOfMines === 0) {
           openBlanckCells(item);
        } else {
          item.cell.textContent = numberOfMines;
        }
      }

    checkWinCondition();

};

// click on cell

let generateField = () => {
    GAME_FIELD.innerHTML = "";
    GAME_FIELD.style.setProperty('--size', cells_number);
    field = createFieldArr(cells_number);
    field.forEach(row => {
        row.forEach(item => {
            GAME_FIELD.appendChild(item.cell);
        });
    });
    field.forEach(row =>{
        row.forEach(item => {
           item.cell.addEventListener('contextmenu', e => {
            e.preventDefault();
            flagOnCell(item);
           })
           item.cell.addEventListener('click', e => {
            playClickSound();
            if(!item.cell.classList.contains('item_flagged')){
                game_clicks++;
                GAME_CLICKS.textContent = game_clicks;
                openCell(item);
            }
           })
        })
    })
    
    return field;
};

generateField();

// create game menu
//clicks
const ITEM_MENU_1 = document.createElement('div');
ITEM_MENU_1.classList.add('menu-item-1');
GAME_MENU.appendChild(ITEM_MENU_1);

const GAME_CLIKS_IMAGE = document.createElement('div');
GAME_CLIKS_IMAGE.classList.add('game-click_image');
ITEM_MENU_1.appendChild(GAME_CLIKS_IMAGE);

const GAME_CLICKS = document.createElement('div');
ITEM_MENU_1.appendChild(GAME_CLICKS);
GAME_CLICKS.textContent = game_clicks;

//timer

const ITEM_MENU_2 = document.createElement('div');
ITEM_MENU_2.classList.add('menu-item-2');
GAME_MENU.appendChild(ITEM_MENU_2);

const GAME_TIME_IMAGE = document.createElement('div');
GAME_TIME_IMAGE.classList.add('game-time_image');
ITEM_MENU_2.appendChild(GAME_TIME_IMAGE);

const TIMER = document.createElement('div');
TIMER.classList.add('game-timer');
ITEM_MENU_2.appendChild(TIMER);
TIMER.innerHTML = "00:00"

// remaining mines

const ITEM_MENU_3 = document.createElement('div');
ITEM_MENU_3.classList.add('menu-item-3');
GAME_MENU.appendChild(ITEM_MENU_3);

const GAME_MINE_IMAGE = document.createElement('div');
GAME_MINE_IMAGE.classList.add('game-mine_image');
ITEM_MENU_3.appendChild(GAME_MINE_IMAGE);

const FLAGS = document.createElement('div');
FLAGS.classList.add('flags-container');
ITEM_MENU_3.appendChild(FLAGS);
FLAGS.textContent = remaining_flags;

// used flags

const ITEM_MENU_4 = document.createElement('div');
ITEM_MENU_4.classList.add('menu-item-4');
GAME_MENU.appendChild(ITEM_MENU_4);

const GAME_FLAGS_IMAGE = document.createElement('div');
GAME_FLAGS_IMAGE.classList.add('game-flags_image');
ITEM_MENU_4.appendChild(GAME_FLAGS_IMAGE);

const USED_FLAGS = document.createElement('div');
USED_FLAGS.classList.add('flags-container');
ITEM_MENU_4.appendChild(USED_FLAGS);
USED_FLAGS.textContent = flags_used;

// // new game

// const RESTART_BUTTON = document.createElement('div');
// RESTART_BUTTON.classList.add('button');
// GAME_CONTAINER.appendChild(RESTART_BUTTON);
// RESTART_BUTTON.textContent = 'New Game';

// // game reload 

// const saveGame = () => {
   
//     let gameStatus = {
//         field,
//         flagsUsed: flags_used,
//         remainingMines: remaining_flags,
//         gameClicks: game_clicks,
//         gameTime: game_time,
//     }
//     localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
// }

// const restartGame = () => {
//     const savedGame = localStorage.getItem('gameStatus');
//     if (savedGame) {
//       const gameStatus = JSON.parse(savedGame);
//       field = gameStatus.field;
//       flags_used = gameStatus.flagsUsed;
//       remaining_flags = gameStatus.remainingMines;
//       game_clicks = gameStatus.gameClicks;
//       game_time = gameStatus.gameTime;
     
//       TIMER.textContent = game_time + "\n seconds";
//       FLAGS.textContent = remaining_flags + "\n mines remain";
//       USED_FLAGS.textContent = flags_used + "\n flags used";
//     }
// }

// window.addEventListener('beforeunload', saveGame);

// window.addEventListener('DOMContentLoaded', restartGame);

// RESTART_BUTTON.addEventListener('click', init);

// sound accompaniment (on/off) when clicking on cell and at the end of the game

const clickSound = new Audio();
clickSound.src = '../assets/sounds/click.wav';

const loseSound = new Audio();
loseSound.src = '../assets/sounds/lose.wav';

const winSound = new Audio();
winSound.src = '../assets/sounds/win.wav'

let playClickSound = () => {
    clickSound.play();
}

let playLoseSound = () => {
    loseSound.play();
}

let playWinSound = () => {
    winSound.play();
}

//change themes

let darkTheme = document.getElementById('theme-style');

const theme_button = document.createElement('div');
theme_button.classList.add('theme-button');
GAME_CONTAINER.insertBefore(theme_button, inputContainer);

function toggleTheme () {
    if (darkTheme.getAttribute('href') === 'dark-theme.css') {
        darkTheme.setAttribute('href', 'light-theme.css');
      } else {
        darkTheme.setAttribute('href', 'dark-theme.css');
      }
}

theme_button.addEventListener('click', toggleTheme);
