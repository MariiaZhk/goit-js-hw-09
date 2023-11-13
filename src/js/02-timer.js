// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.

// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dateTimeInput = document.querySelector('#datetime-picker');
startBtn.disabled = true;
let timerId = null;
let selectedDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      const onStartBtnClick = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      startBtn.addEventListener('click', onStartBtnClick);
    }
  },
});

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),

  start() {
    timerId = setInterval(() => {
      startBtn.disabled = true;
      dateTimeInput.disabled = true;
      const diff = selectedDate - Date.now();

      if (diff < 0) {
        this.stop();
        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      this.days.textContent = this.pad(days);
      this.hours.textContent = this.pad(hours);
      this.minutes.textContent = this.pad(minutes);
      this.seconds.textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(timerId);
    dateTimeInput.disabled = false;
    startBtn.disabled = true;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

timer.start();
