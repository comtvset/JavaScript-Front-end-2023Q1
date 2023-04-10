import pets from '../../../shelter/pages/main/pets.js';

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const navigator = document.querySelector('.navigator');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
navigator.appendChild(overlay);
const popupLinks = document.querySelectorAll('.popup-link');

function bodyLock() {
    document.body.classList.toggle('lock');
}

function bodyUnlock() {
    document.body.classList.remove('lock');
}


if (burger) {
    burger.addEventListener('click', activeBurger);
    burgerMenu.addEventListener('click', deactiveBurger);
    overlay.addEventListener('click', deactiveBurger);
}

function activeBurger() {
    burger.classList.toggle('_active');
    burgerMenu.classList.toggle('_active');
    bodyLock();
    popupLinks.forEach(function(link) {
        link.style.zIndex = "auto";
      });
}

function deactiveBurger() {
    burgerMenu.classList.remove('_active');
    burger.classList.remove('_active');
    logo.classList.remove('_active');
    document.body.classList.remove('lock');
    bodyUnlock();
    popupLinks.forEach(function(link) {
        link.style.zIndex = "0";
      });
}

// POPUP
const popup = document.querySelector('.popup');


function open(current) {
    current.classList.toggle('open')
    bodyLock();
}

function close() {
    popup.addEventListener('click', (event) => {
        if(event.target.classList.contains('popup-body')) {
            popup.classList.toggle('open')
            bodyUnlock();
        }
        if(event.target.classList.contains('popup-close')) {
            popup.classList.toggle('open')
            bodyUnlock();
            event.preventDefault();
        }
    })
}
close();


if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function(){
                let petName = '';

                const petCardH3List = document.querySelectorAll('.pet-card_h3');
                    petCardH3List.forEach(function(petCardH3, index) {
                        if (index === i) {
                        petName = petCardH3.innerText;
                        }
                    });

                let name = findPetByName(petName);

                const popupName = popupLink.getAttribute('href').replace('#', '');
                getCurrentPet(pets, name)
                const currentPopup = document.getElementById(popupName);
                open(currentPopup)
            })
        }
    }

function findPetByName(petName) {
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].name === petName) {
        return i;
        }
    }
    return -1;
    }


function getCurrentPet(pets, currentIndex) {
    const popupTitle = document.querySelector('.popup-title');
    popupTitle.innerHTML = pets[currentIndex].name;

    const IMG = document.querySelector('.img-class');
    IMG.src = pets[currentIndex].img;

    const popupSubtitle = document.querySelector('.popup-subtitle');
    popupSubtitle.innerHTML = `${pets[currentIndex].type} - ${pets[currentIndex].breed}`;

    const popupText = document.querySelector('.popup-text');
    popupText.innerHTML = pets[currentIndex].description;

    const Age = document.querySelector('.list-age');
    Age.innerHTML = pets[currentIndex].age;

    const inoculations = document.querySelector('.list-inoculations');
    inoculations.innerHTML = pets[currentIndex].inoculations;

    const diseases = document.querySelector('.list-diseases');
    diseases.innerHTML = pets[currentIndex].inoculations;

    const parasites = document.querySelector('.list-parasites');
    parasites.innerHTML = pets[currentIndex].parasites;


    if (currentIndex < 0 || currentIndex >= pets.length) {
      return null;
    }

    return pets[currentIndex];
  }

// PAGINATION
const screenWidth = window.screen.width;

const endLeftbtn = document.getElementById('end-left-btn');
const leftBtn = document.getElementById('left-btn');
const numberBtn = document.getElementById('number-btn');
const rightBtn = document.getElementById('right-btn');
const endRightbtn = document.getElementById('end-right-btn');

numberBtn.classList.add('active-btn');

let currentPage = 1;
endLeftbtn.classList.add('gray-style');
leftBtn.classList.add('gray-style');

function updatePageNumber() {
    numberBtn.textContent = currentPage;
    if (screenWidth <= 767 && screenWidth >= 320) {
        if (currentPage === 16) {
            endRightbtn.classList.add('gray-style');
            rightBtn.classList.add('gray-style');
        }
    }
    if (screenWidth >= 768 && screenWidth <= 1279) {
        if (currentPage === 8) {
            endRightbtn.classList.add('gray-style');
            rightBtn.classList.add('gray-style');
        }
    }
    if (screenWidth >= 1280) {
        if (currentPage === 6) {
            endRightbtn.classList.add('gray-style');
            rightBtn.classList.add('gray-style');
        }
    }

    if (currentPage === 1) {
        endLeftbtn.classList.add('gray-style');
        leftBtn.classList.add('gray-style');
    }
}

function decrementPage() {
  if (currentPage > 1) {
      currentPage--;
      updatePageNumber();
      endRightbtn.classList.remove('gray-style');
      rightBtn.classList.remove('gray-style');
  }
}

function incrementPage() {
    if (screenWidth <= 767 && screenWidth >= 320) {
        if (currentPage < 16) {
            currentPage++;
            updatePageNumber();
            endLeftbtn.classList.remove('gray-style');
            leftBtn.classList.remove('gray-style');
        }
    }
    if (screenWidth >= 768 && screenWidth <= 1279) {
        if (currentPage < 8) {
            currentPage++;
            updatePageNumber();
            endLeftbtn.classList.remove('gray-style');
            leftBtn.classList.remove('gray-style');
        }
    }
    if (screenWidth >= 1280) {
        if (currentPage < 6) {
            currentPage++;
            updatePageNumber();
            endLeftbtn.classList.remove('gray-style');
            leftBtn.classList.remove('gray-style');
        }
    }
}

function goToFirstPage() {
    currentPage = 1;
    updatePageNumber();
    endRightbtn.classList.remove('gray-style');
    rightBtn.classList.remove('gray-style');
}

function goToLastPage() {
    if (screenWidth <= 767 && screenWidth >= 320) {
        currentPage = 16;
        updatePageNumber();
        endLeftbtn.classList.remove('gray-style');
        leftBtn.classList.remove('gray-style');
    }
    if (screenWidth >= 768 && screenWidth <= 1279) {
        currentPage = 8;
        updatePageNumber();
        endLeftbtn.classList.remove('gray-style');
        leftBtn.classList.remove('gray-style');
    }
    if (screenWidth >= 1280) {
        currentPage = 6;
        updatePageNumber();
        endLeftbtn.classList.remove('gray-style');
        leftBtn.classList.remove('gray-style');
    }
}

endLeftbtn.addEventListener('click', goToFirstPage);
leftBtn.addEventListener('click', decrementPage);
numberBtn.addEventListener('click', updatePageNumber);
rightBtn.addEventListener('click', incrementPage);
endRightbtn.addEventListener('click', goToLastPage);


let nums = [0, 1, 2, 3, 4, 5, 6, 7];

function random() {
  if (nums.length === 0) {
      nums = [0, 1, 2, 3, 4, 5, 6, 7];
  }
  const index = Math.floor(Math.random() * nums.length);
  const num = nums[index];
  nums.splice(index, 1);
  return num;
}

const IMGs = document.querySelectorAll('.pets-img');
const NAMEs = document.querySelectorAll('.pet-card_h3');

for (let i = 0; i < IMGs.length; i++) {
    const IMG = IMGs[i];
    const NAME = NAMEs[i];
    let current = 1;

    rightBtn.addEventListener('click', () => {
        if (screenWidth <= 767 && screenWidth >= 320) {
            if(current < 16) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current++;
            }
        }
        if (screenWidth >= 768 && screenWidth <= 1279) {
            if(current < 8) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current++;
            }
        }
        if (screenWidth >= 1280) {
            if(current < 6) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current++;
            }
        }
    });

    leftBtn.addEventListener('click', () => {
        if(current > 1) {
            let randomNum = random(0, 7);
            IMG.src = pets[randomNum].img;
            NAME.innerHTML = pets[randomNum].name;
            current--;
        }
    });

    endRightbtn.addEventListener('click', () => {
        if (screenWidth <= 767 && screenWidth >= 320) {
            if(current < 16) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current = currentPage;
            }
        }
        if (screenWidth >= 768 && screenWidth <= 1279) {
            if(current < 8) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current = currentPage;
            }
        }
        if (screenWidth >= 1280) {
            if(current < 6) {
                let randomNum = random(0, 7);
                IMG.src = pets[randomNum].img;
                NAME.innerHTML = pets[randomNum].name;
                current = currentPage;
            }
        }
    });

    endLeftbtn.addEventListener('click', () => {
        if(current > 1) {
            let randomNum = random(0, 7);
            IMG.src = pets[randomNum].img;
            NAME.innerHTML = pets[randomNum].name;
            current = currentPage;
        }
    });
}


window.addEventListener('resize', function() {
    if (window.innerWidth > 1280) {
        location.reload();
      }
    if (window.innerWidth < 1279) {
      location.reload();
    }
    if (window.innerWidth <= 767 && window.innerWidth >= 320) {
        location.reload();
      }
  });


  console.log(`
1. Реализация burger menu на обеих страницах: +26
    ◦ при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2
    ◦ при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4
    ◦ высота адаптивного меню занимает всю высоту экрана: +2
    ◦ при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4
    ◦ бургер-иконка создана при помощи html+css, без использования изображений: +2
    ◦ ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2
    ◦ при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2
    ◦ расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2
    ◦ область, свободная от бургер-меню, затемняется: +2
    ◦ страница под бургер-меню не прокручивается: +4
2. Реализация слайдера-карусели на странице Main: +28
    ◦ при нажатии на стрелки происходит переход к новому блоку элементов: +4
    ◦ смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +0
    ◦ слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4
    ◦ при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4
- каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
    ◦ в текущем блоке слайда карточки с питомцами не повторяются: +4
    ◦ в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4
    ◦ сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: +0
    ◦ при каждой перезагрузке страницы формируется новая последовательность карточек: +2
    ◦ генерация наборов карточек происходит на основе 8 объектов с данными о животными: +2
3. Реализация пагинации на странице Pets: +25
    ◦ при перезагрузке страницы всегда открывается первая страница пагинации: +2
    ◦ при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
    ◦ при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
    ◦ при открытии первой страницы кнопки << и < неактивны: +2
    ◦ при открытии последней страницы кнопки > и >> неактивны: +2
    ◦ в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
- каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
    ◦ при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
    ◦ при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +0
    ◦ карточки питомцев не должны повторяться на одной странице: +4
    ◦ при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
    ◦ при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +0
    ◦ общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +1
    ◦ при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +0
4. Реализация попап на обеих страницах: +12
    ◦ попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2
    ◦ часть страницы вне попапа затемняется: +2
    ◦ при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2
    ◦ при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2
    ◦ кнопка с крестиком интерактивная: +2
    ◦ окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2

    Total points: 91
`);