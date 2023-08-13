import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Notiflix from "notiflix";

const startButton = document.querySelector("[data-start]");
const datePicker = document.querySelector("#datetime-picker");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let countdownInterval;
let targetDateTimestamp = null;

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => value.toString().padStart(2, "0");

const updateTimer = () => {
  const currentDate = new Date().getTime();
  const timeDifference = targetDateTimestamp - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    Notiflix.Notify.success("Countdown has finished!");
    return;
  }

  const timeLeft = convertMs(timeDifference);
  updateTimerDisplay(timeLeft);
};

const updateTimerDisplay = (time) => {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
};

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      Notiflix.Notify.success("You can start the timer now");
      startButton.disabled = false;
      targetDateTimestamp = selectedDate.getTime();
    }
  },
});

startButton.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;
});

document.addEventListener("DOMContentLoaded", () => {
  const selectedDate = datePicker._flatpickr.selectedDates[0];
  if (!selectedDate || selectedDate <= new Date()) {
    startButton.disabled = true;
  }
});
