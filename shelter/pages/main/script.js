import pets from './pets.js';

// const body = document.querySelector('body');
// body.addEventListener('click', (event) => {
//     console.dir(event.target)
// })


const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const navigator = document.querySelector('.navigator');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
navigator.appendChild(overlay);

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
}

function deactiveBurger() {
    burgerMenu.classList.remove('_active');
    burger.classList.remove('_active');
    logo.classList.remove('_active');
    bodyUnlock();
}



// POPUP
const popupLinks = document.querySelectorAll('.popup-link');
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
                open(currentPopup);
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