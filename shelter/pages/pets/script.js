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