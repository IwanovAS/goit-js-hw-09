// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Отримання посилань на кнопки
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null; // Змінна для збереження ідентифікатора інтервалу
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStartButtonClick() {
  startButton.disabled = true; 
  stopButton.disabled = false; 

  intervalId = setInterval(changeBackgroundColor, 1000);
}

function onStopButtonClick() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

