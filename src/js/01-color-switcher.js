const bodyElement = document.querySelector('body');
const startButton = document.querySelector('[data-start]')
const INTERVAL_TIME = 1000;
let interval = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
    const bgColor = getRandomHexColor();
    bodyElement.style.backgroundColor = bgColor
}


bodyElement.addEventListener('click', (e) => {

    if (e.target.dataset.start === '') {
        interval = setInterval(changeBgColor, INTERVAL_TIME)
        startButton.setAttribute('disabled', 'disabled')
    } else if (e.target.dataset.stop === '') {
        clearInterval(interval)
        startButton.removeAttribute('disabled')
    }
})
