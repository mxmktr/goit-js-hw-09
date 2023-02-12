import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.js';

const timer = document.querySelector('.timer');
const dateInput = document.getElementById('datetime-picker');

/* наводим красоту с помощью js */
const allField = document.querySelectorAll('.field');
const allValue = document.querySelectorAll('.value');

timer.style.display = 'flex';
timer.style.marginTop = '10px';

for (let i = 0; i < allField.length - 1; i++) {
  allField[i].style.marginRight = '10px';
}

allField.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.fontWeight = 'bold';
  element.style.fontSize = '12px';
  element.style.textTransform = 'uppercase';
});

allValue.forEach(element => (element.style.fontSize = '19px'));

/* реализация основного блока! */

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const button = document.querySelector('[data-start]');
buttonDisabledON();

let leftTimeMs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    leftTimeMs = selectedDates[0].getTime() - new Date().getTime();

    if (leftTimeMs > 0) {
      buttonDisabledOff();
    } else {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    }
  },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', () => {
  buttonDisabledON();
  timeControllerSetup(convertMs(leftTimeMs));

  setInterval(() => {
    leftTimeMs -= 1000;
    timeControllerSetup(convertMs(leftTimeMs));
  }, 1000);
});

function buttonDisabledON() {
  button.setAttribute('disabled', true);
}

function buttonDisabledOff() {
  button.removeAttribute('disabled');
}

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

function timeControllerSetup({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  const data = value.toString();
  if (data.length < 2) {
    return data.padStart(2, 0);
  } else return value;
}
