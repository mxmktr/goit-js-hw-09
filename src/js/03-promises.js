import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.js';

const form = document.querySelector('.form');

const inputData = {};
const options = { timeout: 1000 };

form.addEventListener('submit', event => {
  event.preventDefault();
  createInputData(event);

  if (inputData.amount >= 1) {
    let timer = inputData.delay;
    for (let i = 1; i <= inputData.amount; i++) {
      createPromise(i, timer);
      timer += inputData.step;
    }
  }

  event.currentTarget.reset();
});

function createInputData({ currentTarget }) {
  inputData.delay = Number(currentTarget.elements.delay.value);
  inputData.step = Number(currentTarget.elements.step.value);
  inputData.amount = Number(currentTarget.elements.amount.value);
}

function createPromise(position, delay) {
  const objForLog = { position, delay };
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(objForLog);
      } else {
        reject(objForLog);
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.failure(
        `✅ Fulfilled promise ${position} in ${delay}ms`,
        options
      );
      /* console.log(`✅ Fulfilled promise ${position} in ${delay}ms`); */
    })

    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`,
        options
      );
      /* console.log(`❌ Rejected promise ${position} in ${delay}ms`); */
    });
}
