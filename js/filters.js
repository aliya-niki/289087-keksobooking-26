import {SIMILAR_PROPERTIES_MAX_NUMBER, debounce} from './util.js';
import {setAdPins} from './map.js';

const filtersFormElement = document.querySelector('.map__filters');
const typeFilterElement = filtersFormElement.querySelector('#housing-type');
const priceFilterElement = filtersFormElement.querySelector('#housing-price');
const roomsFilterElement = filtersFormElement.querySelector('#housing-rooms');
const guestsFilterElement = filtersFormElement.querySelector('#housing-guests');

const PricesRange = {
  middle: {min: 10000, max: 50000},
  low: {min: 0, max: 9999},
  high: {min: 50001, max: Infinity},
};

const FilterType = {
  TYPE: 'housing-type',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'housing-features',
  PRICE: 'housing-price',
};

const isMatchToFilter = {
  [FilterType.TYPE]: (property, value) => value === 'any' ? true : property.offer.type === value,
  [FilterType.ROOMS]: (property, value) => value === 'any' ? true : property.offer.rooms === parseInt(value, 10),
  [FilterType.GUESTS]: (property, value) => value === 'any' ? true : property.offer.guests === parseInt(value, 10),
  [FilterType.FEATURES]: (property, values) => !property.offer.features && values.length ? false : values.every((item) => property.offer.features.includes(item)),
  [FilterType.PRICE]: (property, value) => value === 'any' ? true : (property.offer.price <= PricesRange[value].max && property.offer.price >= PricesRange[value].min),
};

const filterProperties = (data) => {
  const propertiesFiltered = [];
  const featuresApplied = [...filtersFormElement.querySelectorAll('.map__checkbox:checked')].map((item) => item.value);
  for (const item of data) {
    if (propertiesFiltered.length >= SIMILAR_PROPERTIES_MAX_NUMBER) {
      break;
    }

    if (isMatchToFilter[FilterType.TYPE](item, typeFilterElement.value)
      && isMatchToFilter[FilterType.ROOMS](item, roomsFilterElement.value)
      && isMatchToFilter[FilterType.GUESTS](item, guestsFilterElement.value)
      && isMatchToFilter[FilterType.PRICE](item, priceFilterElement.value)
      && isMatchToFilter[FilterType.FEATURES](item, featuresApplied)) {
      propertiesFiltered.push(item);
    }
  }

  return propertiesFiltered;
};

const filterChangeHandler = (properties) => {
  const propertiesFiltered = filterProperties(properties);
  setAdPins(propertiesFiltered);
};

const setOnFiltersApply = (data) => {
  filtersFormElement.addEventListener('change', debounce(() => filterChangeHandler(data)));
  filtersFormElement.addEventListener('reset', debounce(() => filterChangeHandler(data)));
};

const resetFilters = () => {
  filtersFormElement.reset();
};

export {setOnFiltersApply, resetFilters};

