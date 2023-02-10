const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let executionId;

buttonStart.addEventListener('click', changeColorOperationByStart);

buttonStop.addEventListener('click', stopButtonActivation);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorOperationByStart() {
  buttonIsDisabled(buttonStart);
  body.style.backgroundColor = getRandomHexColor();

  executionId = setInterval(() => {
    buttonIsNotDisabled(buttonStop);
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopButtonActivation() {
  clearInterval(executionId);
  buttonIsDisabled(buttonStop);
  buttonIsNotDisabled(buttonStart);
}

function buttonIsNotDisabled(button) {
  button.removeAttribute('disabled');
}

function buttonIsDisabled(button) {
  button.setAttribute('disabled', true);
}
