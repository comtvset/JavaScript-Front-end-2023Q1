const body = document.querySelector('body');

body.addEventListener('click', (event) => {
    console.log(event.target)
})

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const navigator = document.querySelector('.navigator');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
navigator.appendChild(overlay);


if (burger) {
    burger.addEventListener('click', activeBurger);
    burgerMenu.addEventListener('click', deactiveBurger);
    overlay.addEventListener('click', deactiveBurger);
}

function activeBurger() {
    document.body.classList.toggle('_lock');
    burger.classList.toggle('_active');
    burgerMenu.classList.toggle('_active');
}

function deactiveBurger() {
    burgerMenu.classList.remove('_active');
    burger.classList.remove('_active');
    logo.classList.remove('_active');
    document.body.classList.remove('_lock');
}
