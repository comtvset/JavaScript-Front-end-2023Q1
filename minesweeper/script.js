// const target = document.querySelector('body');
// target.addEventListener('click', function(event) {
//     console.dir(event.target);
// });


const container = document.createElement("div");
container.className = "container";

const heading = document.createElement("h1");
heading.textContent = "minesweeper";

const game = document.createElement("div");
game.className = "game";

const gameSettings = document.createElement("div");
gameSettings.className = "game-settings";

// Выбор размера поля
const select = document.createElement("select");
select.className = "choice";

const sizes = ["10x10", "15x15", "25x25"];
sizes.forEach(function (size) {
    const option = document.createElement("option");
    option.textContent = size;
    select.appendChild(option);
});

// Флаги
const flag = document.createElement("div");
flag.className = "flag";
const flagIMG = document.createElement("img");
flagIMG.src = "/minesweeper/assets/images/flag.jpg";
flagIMG.alt = "flag";
flag.appendChild(flagIMG);
const flagText = document.createElement("h2");
flagText.textContent = ": 10";
flag.appendChild(flagText);

// Время
const time = document.createElement("div");
time.className = "time";
const timeText = document.createElement("h2");
timeText.textContent = "00:00";
time.appendChild(timeText);

// Звук
const sound = document.createElement("div");
sound.className = "sound";
const soundText = document.createElement("h2");
soundText.textContent = "sound";
sound.appendChild(soundText);

// Тема
const theme = document.createElement("div");
theme.className = "theme";
const themeText = document.createElement("h2");
themeText.textContent = "white";
theme.appendChild(themeText);

gameSettings.appendChild(select);
gameSettings.appendChild(flag);
gameSettings.appendChild(time);
gameSettings.appendChild(sound);
gameSettings.appendChild(theme);

// Игровое поле
const gameField = document.createElement("div");
gameField.className = "game-field";


game.appendChild(gameSettings);
game.appendChild(gameField);

container.appendChild(heading);
container.appendChild(game);

document.body.appendChild(container);

let cell = document.createElement("div");

function init(countCells, scalingFactor, fieldSize) {
    let cellsAll = [];
    for (let i = 0; i < countCells; i++) {
        let sizeCell = 100 / scalingFactor;
        cell = document.createElement("button");
        cell.className = "cell";
        cell.id = i;
        cell.style.height = `${sizeCell}px`;
        cell.style.width = `${sizeCell}px`;
        gameField.appendChild(cell);
        cellsAll.push(cell)
        // console.log(cell.id)
    }


    const cells = Array.from(gameField.getElementsByClassName('cell'));
    let bombs = [];
    let sizeCell = 100 / scalingFactor;
    for (let i = 0; i < (countCells/10); i++) {
        let randomIndex = Math.floor(Math.random() * cells.length);
        const bombIMG = document.createElement("img");
        bombIMG.src = "/minesweeper/assets/icons/icon.png";
        bombIMG.alt = "bomb";
        bombIMG.style.height = `${sizeCell-7}px`;
        bombIMG.style.width = `${sizeCell-7}px`;
        cell = cells[randomIndex];
        cell.appendChild(bombIMG);
        cell.classList.add("bomb");
        cells.splice(randomIndex, 1);
        bombs.push(cell);
        cell.bombIMG = bombIMG;
        bombIMG.style.display = "none";
    }
    bombs.sort((a, b) => a.id - b.id)
    // console.dir(cellsAll)
    // console.dir(cells)
    // console.dir(bombs)
    gameField.addEventListener('click', (event) => {
        const index = cells.indexOf(event.target);
        const column = index % fieldSize;
        const row = Math.floor(index / fieldSize);
        isBomb(row, column)
        if (event.target.classList.value == "cell bomb") {
            event.target.bombIMG.style.display = "block";
            console.log('GAME OVER')
        }
    })

    function isBomb(row, column) {
        const index = row * fieldSize + column;
        // console.log(index)
        return bombs.includes(index);
    }

}
init(100, 2, 10);



const choice = document.querySelector('.choice');

choice.addEventListener('change', function(event) {
  const selectedOption = event.target.value;

  while (gameField.firstChild) {
    gameField.removeChild(gameField.firstChild);
  }

  if (selectedOption === '10x10') {
    init(100, 2, 10);
  }

  if (selectedOption === '15x15') {
    init(225, 3, 15);
  }

  if (selectedOption === '25x25') {
    init(625, 5, 25);
  }
});



let timerId;
let seconds = 0;
let isTimerRunning = false;

function startTimer() {
  if (!isTimerRunning) {
    timerId = setInterval(updateTime, 1000);
    isTimerRunning = true;
  }
}

function resetTimer() {
  clearInterval(timerId);
  seconds = 0;
  updateTime();
  isTimerRunning = false;
}

function updateTime() {
  const formattedTime = formatTime(seconds);
  timeText.textContent = formattedTime;
  seconds++;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secondsRemaining).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

// gameSettings.appendChild(time);

choice.addEventListener('change', function(event) {
  resetTimer();
});

gameField.addEventListener('click', function(event) {
  startTimer();
});

gameSettings.appendChild(select);
gameSettings.appendChild(flag);
gameSettings.appendChild(time);
gameSettings.appendChild(sound);
gameSettings.appendChild(theme);