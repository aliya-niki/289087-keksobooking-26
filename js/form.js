const adFormElement = document.querySelector('.ad-form');
const typeInputElement = adFormElement.querySelector('#type');
const priceInputElement = adFormElement.querySelector('#price');
const timeInputElement = adFormElement.querySelector('.ad-form__element--time');
const roomNumberInputElement = adFormElement.querySelector('#room_number');
const capacityInputElement = adFormElement.querySelector('#capacity');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('.map__filter');
const mapFiltersFeatureElement = mapFiltersFormElement.querySelector('.map__features');

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

const onTypeInputChange = (evt) => {
  const value = evt.target.value;
  priceInputElement.placeholder =  minPriceByType[value];
  pristine.validate(priceInputElement);
};

typeInputElement.addEventListener('change', onTypeInputChange);

const validatePrice = (priceValue) => priceValue.length && parseInt(priceValue, 10) >= minPriceByType[typeInputElement.value];
const getPriceInvalidMessage = (priceValue) => {
  const minPrice = minPriceByType[typeInputElement.value];
  if (priceValue.length && parseInt(priceValue, 10) <= minPrice) {
    return `Минимальная цена для выбранного типа жилья - ${minPrice} руб`;
  }
};
pristine.addValidator(priceInputElement, validatePrice, getPriceInvalidMessage);

const onTimeInputChange = (evt) => {
  if (evt.target.tagName === 'SELECT') {
    switch (evt.target.id) {
      case 'timein':
        timeInputElement.querySelector('#timeout').value = evt.target.value;
        break;
      case 'timeout':
        timeInputElement.querySelector('#timein').value = evt.target.value;
        break;
    }
  }
};

timeInputElement.addEventListener('change', onTimeInputChange);

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

adFormElement.addEventListener('submit', onFormSubmit);

// Задание 7.2: Отрисуй меня полностью (часть 2):
// "Реализуйте с помощью JavaScript перевод страницы в неактивное/активное состояние. Все пункты, кроме первого про карту."

// eslint-disable-next-line no-unused-vars
const toggleFormDisabled = (isActive) => {
  if (!isActive) {
    adFormElement.classList.add('ad-form--disabled');
    mapFiltersFormElement.classList.add('map__filters--disabled');
  } else {
    adFormElement.classList.remove('ad-form--disabled');
    mapFiltersFormElement.classList.remove('map__filters--disabled');
  }

  for (let i = 0; i < adFormFieldsetElements.length; i++) {
    adFormFieldsetElements[i].disabled = !isActive;
  }

  for (let i = 0; i < mapFiltersSelectElements.length; i++) {
    mapFiltersSelectElements[i].disabled = !isActive;
  }

  mapFiltersFeatureElement.disabled = !isActive;
};

