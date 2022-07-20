import {setOnMainPinMove, setMainPinCoordinate} from './map.js';
import {DEFAULT_CENTRE_COORDINATE} from './util.js';

const DEFAULT_START_PRICE = 1000;
const MAX_PRICE = 100000;
const ADRRESS_DECIMALS_NUMBER = 5;

const adFormElement = document.querySelector('.ad-form');
const typeInputElement = adFormElement.querySelector('#type');
const priceInputElement = adFormElement.querySelector('#price');
const timeinInputElement = adFormElement.querySelector('#timein');
const timeoutInputElement = adFormElement.querySelector('#timeout');
const roomNumberInputElement = adFormElement.querySelector('#room_number');
const capacityInputElement = adFormElement.querySelector('#capacity');
const addressInputElement = adFormElement.querySelector('#address');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

const minPriceByType = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
  'hotel': 3000
};

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
}, true);


// Capacity & Rooms number Inputs

const validateCapacity = (capacityValue) => {
  const capacity = parseInt(capacityValue, 10);
  const roomsNumber = parseInt(roomNumberInputElement.value, 10);

  return roomsNumber === 100 ? capacity === 0 : roomsNumber >= capacity && capacity !== 0;
};

const getCapacityInvalidMessage = (capacityValue) => {
  const capacity = parseInt(capacityValue, 10);
  const roomsNumber = parseInt(roomNumberInputElement.value, 10);

  if (roomsNumber === 100 && capacity > 0) {
    return '100 комнат - не для гостей';
  }
  return 'Количество гостей д.б.не меньше 1 и не может превышать количество комнат';
};
pristine.addValidator(capacityInputElement, validateCapacity, getCapacityInvalidMessage);

roomNumberInputElement.addEventListener('change', () => pristine.validate(capacityInputElement));


// Property type & Price Inputs + price slider

noUiSlider.create(priceSliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: DEFAULT_START_PRICE,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

const onPriceSliderChange = () => {
  priceInputElement.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceInputElement);
};

const onTypeChange = (evt) => {
  const value = evt.target.value;
  priceInputElement.placeholder =  minPriceByType[value];

  if (priceInputElement.value.length) {
    pristine.validate(priceInputElement);
  }
};

typeInputElement.addEventListener('change', onTypeChange);

priceSliderElement.noUiSlider.on('slide', onPriceSliderChange);

priceInputElement.addEventListener('change', (evt) => {
  priceSliderElement.noUiSlider.set(evt.target.value);
});

const validatePrice = (priceValue) => priceValue.length && parseInt(priceValue, 10) >= minPriceByType[typeInputElement.value];
const getPriceInvalidMessage = (priceValue) => {
  const minPrice = minPriceByType[typeInputElement.value];
  if (priceValue.length && parseInt(priceValue, 10) <= minPrice) {
    return `Минимальная цена для выбранного типа жилья - ${minPrice} руб`;
  }
};
pristine.addValidator(priceInputElement, validatePrice, getPriceInvalidMessage);


// TimeIn & TimeOut Inputs

const onTimeinChange = (evt) => {
  timeoutInputElement.value = evt.target.value;
};

timeinInputElement.addEventListener('change', onTimeinChange);

const onTimeoutChange = (evt) => {
  timeinInputElement.value = evt.target.value;
};

timeoutInputElement.addEventListener('change', onTimeoutChange);


// Address Input

const onMapMainPinMove = ({lat, lng}) => {
  addressInputElement.value = `${lat.toFixed(ADRRESS_DECIMALS_NUMBER)}, ${lng.toFixed(ADRRESS_DECIMALS_NUMBER)}`;
};
setOnMainPinMove(onMapMainPinMove);


// Form Submit

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправляю...'; // этого нет в ТЗ. пока оставила, чтобы было удобнее проверять
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setOnAdFormSubmit = (cb) => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);

      blockSubmitButton();
      cb(formData);
    }
  };

  adFormElement.addEventListener('submit', onFormSubmit);
};

// Form Reset

const clearAdForm = () => {
  adFormElement.reset();
  setMainPinCoordinate(DEFAULT_CENTRE_COORDINATE);
  priceSliderElement.noUiSlider.set(DEFAULT_START_PRICE);
};

const onResetClick = (evt) => {
  evt.preventDefault();
  clearAdForm();
};

resetButtonElement.addEventListener('click', onResetClick);

export {setOnAdFormSubmit, clearAdForm, unblockSubmitButton};
