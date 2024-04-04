const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.disabled = true;
let interval = null;

startBtn.addEventListener('click', handleBtnStart);

function handleBtnStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtn.addEventListener('click', handleBtnStop);

function handleBtnStop() {
  clearInterval(interval);

  stopBtn.disabled = true;
  startBtn.disabled = false;
}
