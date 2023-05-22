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


init(10,10,10,50);

function init(WIDTH, HEIGHT, BOMBS_COUNT, SIZE_CELL) {
    const cellsCount = WIDTH * HEIGHT;
    gameField.innerHTML = `<button class="cell" style="height: ${SIZE_CELL}px; width: ${SIZE_CELL}px"></button>`.repeat(cellsCount);
    const cells = [...gameField.children];

    const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

    gameField.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // console.log(bombs)

        const index = cells.indexOf(event.target);
        const column = index % WIDTH;
        const row = Math.floor(index / WIDTH);
        open(row, column);
    });

    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if(isBomb(row + y, column + x)) {
                    count++
                }
            }
        }
        return count;
    }

       function open(row, column) {
        const index = row * WIDTH + column;
        const cell = cells[index];
        const bombIMG = document.createElement("img");
        const bombSIZE = 400/WIDTH;

        if (isBomb(row, column)) {
            bombIMG.src = "/minesweeper/assets/icons/icon.png";
            bombIMG.alt = "bomb";
            bombIMG.style.height = `${bombSIZE}px`;
            bombIMG.style.width = `${bombSIZE}px`;
            cell.appendChild(bombIMG);
          } else {
            cell.innerHTML = getCount(row, column);
          }
        cell.disabled = true;
    }

    function isBomb(row, column) {
        const index = row * WIDTH + column;
        return bombs.includes(index);
    }
}


const choice = document.querySelector('.choice');

choice.addEventListener('change', function(event) {
  const selectedOption = event.target.value;

  while (gameField.firstChild) {
    gameField.removeChild(gameField.firstChild);
  }

  if (selectedOption === '10x10') {
    init(10,10,10,50);
  }

  if (selectedOption === '15x15') {
    init(15,15,20,33.333);
  }

  if (selectedOption === '25x25') {
    init(25,25,50,20);
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