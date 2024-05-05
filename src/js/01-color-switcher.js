const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
  disableBtn(startBtn);
  enableBtn(stopBtn);

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  disableBtn(stopBtn);
  enableBtn(startBtn);

  clearInterval(intervalId);
}

function disableBtn(btn) {
  btn.setAttribute('disabled', true);
}

function enableBtn(btn) {
  btn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
