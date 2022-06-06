import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';


const formElement = document.querySelector('form');


function createPromise(position, delay) {
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)

  })

  return promise
}


formElement.addEventListener('submit', (e) => {
  e.preventDefault()

  const delayValue = +(e.currentTarget.elements.delay.value);
  const stepValue = +(e.currentTarget.elements.step.value);
  const amountValue = +(e.currentTarget.elements.amount.value);
  const amountArray = Array(amountValue).fill(null);

  amountArray.forEach((item, i) => {

    const positionArg = i + 1;
    const delayArg = delayValue + (stepValue * i);

    createPromise(positionArg, delayArg)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  })

})