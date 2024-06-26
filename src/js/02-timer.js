import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = Date.now();

    if (selectedDate < dateNow) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;

    let timerID = null;

    function handleCountdown() {
      startBtn.disabled = true;
      dateTimePicker.disabled = true;

      timerID = setInterval(() => {
        const currentTime = Date.now();

        if (selectedDate < currentTime) {
          clearInterval(timerID);
          dateTimePicker.disabled = false;
          return;
        }
        const timeDifference = selectedDate - currentTime;

        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);
      }, 1000);
    }
    startBtn.addEventListener('click', handleCountdown);
  },
};

flatpickr('#datetime-picker', options);

//
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
  return String(value).padStart(2, '0');
}
