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
flagIMG.src = "./assets/images/flag.jpg";
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
const soundIMG = document.createElement("img");
soundIMG.src = "./assets/images/sound.png";
soundIMG.alt = "sound";
sound.className = "sound";
sound.appendChild(soundIMG);

// Перезагрузка
const reload = document.createElement("div");
reload.className = "reload";
const reloadIMG = document.createElement("img");
reloadIMG.src = "./assets/images/reload.png";
reloadIMG.alt = "reload";
reload.appendChild(reloadIMG);

// Тема
const theme = document.createElement("div");
theme.className = "theme";
const themeIMG = document.createElement("img");
themeIMG.src = `./assets/images/sun.png`;
themeIMG.alt = "theme";
theme.appendChild(themeIMG);

gameSettings.appendChild(select);
gameSettings.appendChild(flag);
gameSettings.appendChild(time);
gameSettings.appendChild(sound);
gameSettings.appendChild(reload);
gameSettings.appendChild(theme);

// Игровое поле
const gameField = document.createElement("div");
gameField.className = "game-field";


game.appendChild(gameSettings);
game.appendChild(gameField);

container.appendChild(heading);
container.appendChild(game);

document.body.appendChild(container);

let timerId;
let seconds = 0;
let isTimerRunning = false;
let finalTime;

function startTimer() {
  if (!isTimerRunning) {
    timerId = setInterval(updateTime, 1000);
    isTimerRunning = true;
  }
}

function stopTimer() {
    clearInterval(timerId);
    isTimerRunning = false;
    finalTime = formatTime(seconds);
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

gameSettings.appendChild(time);


let htmlElement = document.querySelector('html');
const choice = document.querySelector('.choice');


let cellsCount = 10 * 10;
    gameField.innerHTML = `<button class="cell" style="height: 50px; width: 50px"></button>`.repeat(cellsCount);
    let cells = [...gameField.children];

function init(WIDTH, HEIGHT, BOMBS_COUNT, SIZE_CELL) {
    cellsCount = WIDTH * HEIGHT;
    gameField.innerHTML = `<button class="cell" style="height: ${SIZE_CELL}px; width: ${SIZE_CELL}px"></button>`.repeat(cellsCount);
    cells = [...gameField.children];


    flagText.textContent = `: ${BOMBS_COUNT}`;
    flag.appendChild(flagText);

    const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

    let mute = true;

    theme.onclick = function() {
        if (theme.classList.contains('moon')) {
            themeIMG.src = './assets/images/sun.png';
            theme.classList.remove('moon');
            htmlElement.style.background = 'rgb(34, 34, 34)';
            heading.style.color = "azure";
            gameSettings.style.background = "rgb(88, 87, 87)";
            gameField.style.background = "rgb(88, 87, 87)";
            select.style.background = "rgb(88, 87, 87)";
        } else {
            themeIMG.src = './assets/images/moon.png';
            theme.classList.add('moon');
            htmlElement.style.background = 'rgb(167, 167, 167)';
            heading.style.color = "black";
            gameSettings.style.background = "rgb(48, 48, 48)";
            gameField.style.background = "rgb(48, 48, 48)";
            select.style.background = "rgb(48, 48, 48)";
        }
        return;
    };

    sound.onclick = function() {
        sound.classList.toggle('enable');
        if (sound.classList.contains('enable')) {
            mute = false;
        } else {
            mute = true;
            sound.currentTime = 0;
        }
    };

    let clickHandler = (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const index = cells.indexOf(event.target);
        const column = index % WIDTH;
        const row = Math.floor(index / WIDTH);

        const cell = cells[index];
        const isCellOpen = cell.disabled;
        const hasFlag = cell.classList.contains('flag-red');

        if (isCellOpen) {
            return;
        }

        if (hasFlag) {
            toggleFlag(row, column);
        } else {
            open(row, column);
        }
    };

    let rightClickHandler = (event) => {
        event.preventDefault();
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const index = cells.indexOf(event.target);
        const column = index % WIDTH;
        const row = Math.floor(index / WIDTH);
        const cell = cells[index];
        const isCellOpen = cell.disabled;

        if (isCellOpen) {
            return;
        }

        toggleFlag(row, column);
    };

    function isValid(row, column) {
        return row >= 0 && row < HEIGHT && column >= 0 && column < WIDTH;
    }

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

    function showCellContent(cell, row, column) {
        if (isBomb(row, column)) {
            const bombIMG = document.createElement("img");
            const bombSIZE = 400 / WIDTH;
            bombIMG.src = "./assets/icons/icon.png";
            bombIMG.alt = "bomb";
            bombIMG.style.height = `${bombSIZE}px`;
            bombIMG.style.width = `${bombSIZE}px`;
            cell.appendChild(bombIMG);
        } else {
            const count = getCount(row, column);
            if (count !== 0) {
                if (count === 1) {
                    cell.style.color = '#00009899';
                }
                if (count === 2) {
                    cell.style.color = '#005000';
                }
                if (count === 3) {
                    cell.style.color = '#6c0000a6';
                }
                if (count === 4) {
                    cell.style.color = '#848400';
                }
                if (count === 5) {
                    cell.style.color = 'orange';
                }
                cell.innerHTML = count;
                cell.style.fontWeight = 'bold';
            }
        }
    }

    let closedCount = cellsCount;

    function open(row, column) {
        if (!isValid(row, column)) return;


        const index = row * WIDTH + column;
        const cell = cells[index];

        if (cell.disabled === true || cell.classList.contains('flag-red')) return;

        cell.disabled = true;

        if (isBomb(row, column)) {
            playSound(1);
            removeFlagClasses();
            stopTimer();
            alert(`Game over, your time: ${finalTime}`);
            openAllCells();
            gameField.classList.add('field-disabled');

            setTimeout(function() {
                playSound(2);
              }, 2000);
            return;
        } else {
            startTimer();
            const count = getCount(row, column);
            if (count !== 0) {
                showCellContent(cell, row, column);
                playSound(4);
                closedCount--;
                if (closedCount <= BOMBS_COUNT) {
                    playSound(3);
                    stopTimer();
                    alert(`Win, your time: ${finalTime}`);
                    gameField.classList.add('field-disabled');
                    // openAllCells();
                }
                return;
            }
        }

        closedCount--;

        if (closedCount < BOMBS_COUNT) {
            stopTimer();
            alert(`Win, your time: ${finalTime}`);
            gameField.classList.add('field-disabled');
            // openAllCells()
            return;
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                open(row + y, column + x);
            }
        }
    }

    function openAllCells() {
        removeFlagClasses();
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const row = Math.floor(i / WIDTH);
            const column = i % WIDTH;

            cell.disabled = true;
            showCellContent(cell, row, column);
        }
    }

    function isBomb(row, column) {
        if(!isValid(row, column)) return false;

        const index = row * WIDTH + column;
        return bombs.includes(index);
    }

    function toggleFlag(row, column) {
        const index = row * WIDTH + column;
        const cell = cells[index];

        if (cell.disabled) {
            cell.disabled = false;
            cell.classList.remove('flag-red');

        } else {
            if (!cell.innerHTML && event.button === 2) {
            cell.classList.toggle('flag-red');
            }
        }

        playSound(5);

        const flaggedCells = document.querySelectorAll('.flag-red');

        if (flaggedCells.length > BOMBS_COUNT) {
            cell.classList.remove('flag-red');
                return;
            }
        updateFlagCount();
    }

    function updateFlagCount() {
        const flaggedCells = document.querySelectorAll('.flag-red');
        const flagCount = BOMBS_COUNT - flaggedCells.length;
        flagText.textContent = `: ${flagCount}`;
    }

    function removeFlagClasses() {
        cells.forEach(cell => {
            cell.classList.remove('flag-red');
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });

    gameField.addEventListener('click', clickHandler);
    gameField.addEventListener('contextmenu', rightClickHandler);

    function playSound(event) {
        // sound.currentTime = 0; // Сбросить текущую позицию аудио
        const audio = document.createElement('audio');
        const source = document.createElement('source');

        if (mute == true) {
            if(event == 1) {
                source.src = './assets/sounds/boom.mp3';
            }
            if(event == 2) {
                source.src = './assets/sounds/fail2.mp3';
            }
            if(event == 3) {
                source.src = './assets/sounds/win2.mp3';
            }
            if(event == 4) {
                source.src = './assets/sounds/step.mp3';
            }
            if(event == 5) {
                source.src = './assets/sounds/flag2.mp3';
            }
        }

        source.type = 'audio/mpeg';

        audio.appendChild(source);
        audio.play();
    }

    reload.addEventListener('click', function(event) {
        location.reload();
    });
}

choice.addEventListener('change', function(event) {
    const selectedOption = event.target.value;

    while (gameField.firstChild) {
      gameField.removeChild(gameField.firstChild);
    }

    if (selectedOption === '10x10') {
        init(10,10,10,50); // ВСЕ ЛОМАЕТСЯ ПОСЛЕ init()
    }

    if (selectedOption === '15x15') {
        init(15,15,20,33.333); // ВСЕ ЛОМАЕТСЯ ПОСЛЕ init()
    }

    if (selectedOption === '25x25') {
        init(25,25,50,20); // ВСЕ ЛОМАЕТСЯ ПОСЛЕ init()
    }
});


choice.addEventListener('change', function(event) {
  resetTimer();
});

gameSettings.appendChild(select);
gameSettings.appendChild(flag);
gameSettings.appendChild(time);
gameSettings.appendChild(sound);
gameSettings.appendChild(reload);
gameSettings.appendChild(theme);

init(10,10,10,50);