import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, shuffle} from './util.js';

const PROPERTIES_NUMBER = 10;

const AVATARS_ID_MIN = 1;
const AVATARS_ID_MAX = 10;

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const TITLES = [
  'Маленькая квартирка рядом с парком',
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Стандартная квартира в центре'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const DESCRIPTIONS = [
  'Отель для ценителей истории. Почуствуй себя героем из прошлого.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
];

const generateUnorderedNumbersArray = (lower, upper) => {
  const arrayLength = upper - lower;
  const numbers = [];

  for (let i = 0; i <= arrayLength; i++) {
    numbers.push(lower + i);
  }

  shuffle(numbers);
  return numbers;
};

const createAvatarsUrls = (lower, upper) => {
  const ids = generateUnorderedNumbersArray(lower, upper);
  const urls = [];

  for (const id of ids) {
    urls.push(`img/avatars/user${String(id).padStart(2, '0')}.png`);
  }

  return urls;
};

const avatars = createAvatarsUrls(AVATARS_ID_MIN, AVATARS_ID_MAX);

const createPhotosArray = (elements) => {
  const photos = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 5); i++) {
    photos.push(getRandomArrayElement(elements));
  }
  return photos;
};

const createFeaturesArray = (elements) => {
  const randomLength = getRandomPositiveInteger(1, elements.length);
  const features = new Set();

  for (let i = 1; i <= randomLength; i++) {
    features.add(getRandomArrayElement(elements));
  }

  return Array.from(features);
};

const createProperty = (index) => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: avatars[index],
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(1, 1000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(0, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: createFeaturesArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: createPhotosArray(PHOTOS),
    },

    location: {
      lat,
      lng,
    },
  };
};

const createProperties = () => {
  const properties = [];
  for (let i = 0; i < PROPERTIES_NUMBER; i++) {
    properties.push(createProperty(i));
  }

  return properties;
};

export {createProperties};
