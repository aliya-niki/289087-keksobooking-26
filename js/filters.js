import {SIMILAR_ADVERTS_MAX_NUMBER, debounce} from './util.js';
import {setAdPins} from './map.js';

const DEFAULT_FILTER = 'any';
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

const filtersFormElement = document.querySelector('.map__filters');
const typeFilterElement = filtersFormElement.querySelector('#housing-type');
const priceFilterElement = filtersFormElement.querySelector('#housing-price');
const roomsFilterElement = filtersFormElement.querySelector('#housing-rooms');
const guestsFilterElement = filtersFormElement.querySelector('#housing-guests');

const isMatchToFilter = {
  [FilterType.TYPE]: (advert, value) => value === DEFAULT_FILTER ? true : advert.offer.type === value,
  [FilterType.ROOMS]: (advert, value) => value === DEFAULT_FILTER ? true : advert.offer.rooms === parseInt(value, 10),
  [FilterType.GUESTS]: (advert, value) => value === DEFAULT_FILTER ? true : advert.offer.guests === parseInt(value, 10),
  [FilterType.FEATURES]: (advert, values) => !advert.offer.features && values.length ? false : values.every((item) => advert.offer.features.includes(item)),
  [FilterType.PRICE]: (advert, value) => value === DEFAULT_FILTER ? true : (advert.offer.price <= PricesRange[value].max && advert.offer.price >= PricesRange[value].min),
};

const filterAdverts = (data) => {
  const advertsFiltered = [];
  const featuresApplied = [...filtersFormElement.querySelectorAll('.map__checkbox:checked')].map((item) => item.value);
  for (const item of data) {
    if (advertsFiltered.length >= SIMILAR_ADVERTS_MAX_NUMBER) {
      break;
    }

    if (!isMatchToFilter[FilterType.TYPE](item, typeFilterElement.value)) {
      continue;
    }
    if (!isMatchToFilter[FilterType.ROOMS](item, roomsFilterElement.value)) {
      continue;
    }

    if (!isMatchToFilter[FilterType.GUESTS](item, guestsFilterElement.value)) {
      continue;
    }

    if (!isMatchToFilter[FilterType.PRICE](item, priceFilterElement.value)) {
      continue;
    }

    if (isMatchToFilter[FilterType.FEATURES](item, featuresApplied)) {
      advertsFiltered.push(item);
    }
  }

  return advertsFiltered;
};

const filterChangeHandler = (adverts) => {
  const advertsFiltered = filterAdverts(adverts);
  setAdPins(advertsFiltered);
};

const setOnFiltersApply = (data) => {
  filtersFormElement.addEventListener('change', debounce(() => filterChangeHandler(data)));

  filtersFormElement.addEventListener('reset', () => {
    setAdPins(data.slice(0, SIMILAR_ADVERTS_MAX_NUMBER));
  });
};

export {setOnFiltersApply};

