import {setOnMainPinMove} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const typeInputElement = adFormElement.querySelector('#type');
const priceInputElement = adFormElement.querySelector('#price');
const timeinInputElement = adFormElement.querySelector('#timein');
const timeoutInputElement = adFormElement.querySelector('#timeout');
const roomNumberInputElement = adFormElement.querySelector('#room_number');
const capacityInputElement = adFormElement.querySelector('#capacity');
const addressInputElement = adFormElement.querySelector('#address');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');

const DEFAULT_START_PRICE = 1000;

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

const createPriceSlider = (startValue = DEFAULT_START_PRICE) => {
  const slider = {
    range: {
      min: 0,
      max: 100000,
    },
    start: startValue,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };

  return slider;
};

noUiSlider.create(priceSliderElement, createPriceSlider(DEFAULT_START_PRICE));

const onPriceSliderChange = () => {
  priceInputElement.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceInputElement);
};

const onTypeChange = (evt) => {
  const value = evt.target.value;
  priceInputElement.placeholder =  minPriceByType[value];

  priceSliderElement.noUiSlider.destroy();
  noUiSlider.create(priceSliderElement, createPriceSlider(minPriceByType[value]));
  priceSliderElement.noUiSlider.on('change', onPriceSliderChange);
  if (priceInputElement.value.length) {
    priceSliderElement.noUiSlider.set(priceInputElement.value);
    pristine.validate(priceInputElement);
  }
};

typeInputElement.addEventListener('change', onTypeChange);

priceSliderElement.noUiSlider.on('change', onPriceSliderChange);

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
  addressInputElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
setOnMainPinMove(onMapMainPinMove);


// Form Submit

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

adFormElement.addEventListener('submit', onFormSubmit);

