import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const timerElement = document.querySelector('.timer');
const fieldElements = document.querySelectorAll('.field');
const valueElements = document.querySelectorAll('.value');

let delta = 0;
let warning = false;
const FIVE_MINUTES = 60 * 1000 * 5;

const messages = {
    success: "The timer was successfully started!",
    warning: "Hurry up! Less then 5 minutes left",
    failure: "Please choose a date in the future"
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        delta = selectedDates[0].getTime() - new Date().getTime();


        if (delta <= 0) {
            Notiflix.Notify.failure(messages.failure)
            return
        }

        startButton.removeAttribute('disabled')
    },
};



function convertMs(ms) {
// Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    const result = {...value}
    for (let key in result) {
        
        if ((result[key]+'').length < 2) {
            result[key] = (result[key]+'').padStart(2,0)
        }
    }
    return result
}

function outPut(value) {
    const { days, hours, minutes, seconds } = value;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

function timer() {
    const converted = convertMs(delta)
    const plusZero = addLeadingZero(converted)
    outPut(plusZero)
    delta -= 1000
}

function setTimerStyles() {
    timerElement.setAttribute('style', 'display:flex; justify-content:space-between; max-width: 320px; margin-top: 10px')

    fieldElements.forEach(item => {
        item.setAttribute('style', 'display:flex; flex-direction: column; align-items: center; width:75px; background-color: gray; color: white; border-radius: 5px; text-transform: uppercase;')
    })

    valueElements.forEach(item => {
        item.setAttribute('style', 'font-size: 24px')
    })

    startButton.setAttribute('disabled', 'disabled')
}


flatpickr('input#datetime-picker', options)

setTimerStyles()

startButton.addEventListener('click', () => {
    Notiflix.Notify.success(messages.success)
    const interval = setInterval(() => {

        if (delta < 1000) {
            timer()
            clearInterval(interval)
            return
        }

        if (delta <= FIVE_MINUTES && warning === false) {
            Notiflix.Notify.warning(messages.warning)
            warning = true
        }

        timer()
    }, 1000)

})

