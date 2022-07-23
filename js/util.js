const ESC_KEY = 'Escape';
const ERROR_MESSAGE_TIMEOUT = 7000;
const DEFAULT_CENTRE_COORDINATE = {
  lat: 35.68027,
  lng: 139.75829,
};
const SIMILAR_PROPERTIES_MAX_NUMBER = 10;
const DELAY = 500;

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

// Функция взята из интернета и доработана: https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  showGetDataError,
  DEFAULT_CENTRE_COORDINATE,
  SIMILAR_PROPERTIES_MAX_NUMBER,
  isEscapeKey,
  debounce
};
