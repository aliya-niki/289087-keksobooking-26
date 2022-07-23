const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('.map__filter');
const mapFiltersFeatureElement = mapFiltersFormElement.querySelector('.map__features');

const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });
};

const disableFilters = () => {
  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFiltersSelectElements.forEach((element) => {
    element.disabled = true;
  });
  mapFiltersFeatureElement.disabled = true;
};

const enableAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });
};

const enableFilters = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFiltersSelectElements.forEach((element) => {
    element.disabled = false;
  });
  mapFiltersFeatureElement.disabled = false;
};

export {disableAdForm, disableFilters, enableAdForm, enableFilters};
