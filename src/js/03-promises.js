// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
formEl.addEventListener('click', onCreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromises(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let delayInput = Number(delay.value);
  let stepInput = Number(step.value);
  let amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    delayInput += stepInput;
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        return Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { timeout: 10000 }
        );
      })
      .catch(({ position, delay }) => {
        return Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 10000,
        });
      });
  }
}
