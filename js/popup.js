import {declineRoomWord} from './util.js';

const AdvertType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const popupElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderTitle = ({title}, element) => {
  if (title) {
    element.querySelector('.popup__title').textContent = title;
  } else {
    element.querySelector('.popup__title').remove();
  }
};

const renderAddress = ({address}, element) => {
  if (address) {
    element.querySelector('.popup__text--address').textContent = address;
  } else {
    element.querySelector('.popup__text--address').remove();
  }
};

const renderPrice = ({price}, element) => {
  if (price) {
    element.querySelector('.popup__text--price').firstChild.textContent = price;
  } else {
    element.querySelector('.popup__text--price').remove();
  }
};

const renderType = ({type}, element) => {
  if (type) {
    element.querySelector('.popup__type').textContent = AdvertType[type.toUpperCase()];
  } else {
    element.querySelector('.popup__type').remove();
  }
};

const renderCapacity = (offer, element) => {
  if (offer.rooms >= 0 && offer.guests >= 0) {
    element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declineRoomWord(parseInt(offer.rooms, 10))} для ${offer.guests} ${parseInt(offer.guests, 10) === 1 ? 'гостя' : 'гостей'}`;
  } else {
    element.querySelector('.popup__text--capacity').remove();
  }
};

const renderTime = (offer, element) => {
  if (offer.checkin && offer.checkout) {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    element.querySelector('.popup__text--time').remove();
  }
};


const renderDescription = ({description}, element) => {
  if (description) {
    element.querySelector('.popup__description').textContent = description;
  } else {
    element.querySelector('.popup__description').remove();
  }
};

const renderAvatar = ({avatar}, element) => {
  if (avatar) {
    element.querySelector('.popup__avatar').src = avatar;
  } else {
    element.querySelector('.popup__avatar').remove();
  }
};

const createPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.map((photo) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    fragment.append(photoElement);
  });

  return fragment;
};

const renderPhotos = ({photos}, element) => {
  if (photos) {
    element.querySelector('.popup__photos').innerHTML = '';
    element.querySelector('.popup__photos').append(createPhotos(photos));
  } else {
    element.querySelector('.popup__photos').remove();
  }
};

const renderFeatures = ({features}, element) => {
  if (features) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    const featuresListElement = element.querySelector('.popup__features');
    const featuresListElements = featuresListElement.querySelectorAll('.popup__feature');

    featuresListElements.forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    element.querySelector('.popup__features').remove();
  }
};


const createPopup = ({author, offer}) => {
  const newPopupElement = popupElement.cloneNode(true);

  renderTitle(offer, newPopupElement);
  renderAddress(offer, newPopupElement);
  renderPrice(offer, newPopupElement);
  renderType(offer, newPopupElement);
  renderCapacity(offer, newPopupElement);
  renderTime(offer, newPopupElement);
  renderDescription(offer, newPopupElement);
  renderAvatar(author, newPopupElement);
  renderPhotos(offer, newPopupElement);
  renderFeatures(offer, newPopupElement);

  return newPopupElement;
};

export {createPopup};
