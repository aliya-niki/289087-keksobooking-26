const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('.map__filter');
const mapFiltersFeatureElement = mapFiltersFormElement.querySelector('.map__features');

const disableForms = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFiltersFormElement.classList.add('map__filters--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersSelectElements.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersFeatureElement.disabled = true;
};

const enableForms = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFiltersFormElement.classList.remove('map__filters--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersSelectElements.forEach((element) => {
    element.disabled = false;
  });

  mapFiltersFeatureElement.disabled = false;
};

export {disableForms, enableForms};
