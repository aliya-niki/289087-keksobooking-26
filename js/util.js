const ESC_KEY = 'Escape';
const ERROR_MESSAGE_TIMEOUT = 7000;
const TOKIO_CENTRE_COORDINATE = {
  lat: 35.68027,
  lng: 139.75829,
};

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const showGetDataError = (message) => {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.style.zIndex = '100';
  errorMessageElement.style.position = 'absolute';
  errorMessageElement.style.left = 0;
  errorMessageElement.style.right = 0;
  errorMessageElement.style.margin = '0 auto';
  errorMessageElement.style.fontSize = '20px';
  errorMessageElement.style.textAlign = 'center';
  errorMessageElement.style.backgroundColor = 'red';

  errorMessageElement.textContent = message;
  document.body.insertAdjacentElement('afterbegin', errorMessageElement);

  setTimeout(() => {
    errorMessageElement.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === ESC_KEY;

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, shuffle, showGetDataError, TOKIO_CENTRE_COORDINATE, isEscapeKey};
