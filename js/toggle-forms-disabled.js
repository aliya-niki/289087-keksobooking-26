const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('.map__filter');
const mapFiltersFeatureElement = mapFiltersFormElement.querySelector('.map__features');

const toggleAdFormDisabled = (isDisabled) => {
  if (isDisabled) {
    adFormElement.classList.add('ad-form--disabled');
  } else {
    adFormElement.classList.remove('ad-form--disabled');
  }

  adFormFieldsetElements.forEach((element) => {
    element.disabled = isDisabled;
  });
};


const toggleFiltersDisabled = (isDisabled) => {
  if (isDisabled) {
    mapFiltersFormElement.classList.add('map__filters--disabled');
  } else {
    mapFiltersFormElement.classList.remove('map__filters--disabled');
  }

  mapFiltersSelectElements.forEach((element) => {
    element.disabled = false;
  });
  mapFiltersFeatureElement.disabled = false;
};

export {toggleAdFormDisabled, toggleFiltersDisabled};
