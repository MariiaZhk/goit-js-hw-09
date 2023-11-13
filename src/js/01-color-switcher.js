// Завдання 1 - перемикач кольорів
// HTML містить кнопки «Start» і «Stop».
// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

let timerId = null;

const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
};

refs.startBtnEl.addEventListener('click', onStartBtnClick);
refs.stopBtnEl.addEventListener('click', onStopBtnClick);
refs.stopBtnEl.disabled = true;

function onStartBtnClick() {
  refs.startBtnEl.disabled = true;
  refs.stopBtnEl.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  refs.stopBtnEl.disabled = true;
  refs.startBtnEl.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
