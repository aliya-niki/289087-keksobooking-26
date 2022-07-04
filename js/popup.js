const popupElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

const PropertyType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const declineRoomWord = (counter) => {
  if (counter === 0 || counter > 4) {
    return 'комнат';
  } else if (counter === 1) {
    return 'комната';
  } else if (counter === 2 || counter === 3 || counter === 4) {
    return 'комнаты';
  }
};

const renderFeatures = (container, features) => {
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  const featuresListElement = container.querySelector('.popup__features');
  const featuresListElements = featuresListElement.querySelectorAll('.popup__feature');

  return featuresListElements.forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
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

const createPopup = ({author, offer}) => {
  const newPopupElement = popupElement.cloneNode(true);

  if (offer.title) {
    newPopupElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    newPopupElement.querySelector('.popup__title').remove();
  }

  if (offer.address) {
    newPopupElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    newPopupElement.querySelector('.popup__text--address').remove();
  }

  if (offer.price) {
    newPopupElement.querySelector('.popup__text--price').firstChild.textContent = `${offer.price} `;
  } else {
    newPopupElement.querySelector('.popup__text--price').remove();
  }

  if (offer.type) {
    newPopupElement.querySelector('.popup__type').textContent = PropertyType[offer.type.toUpperCase()];
  } else {
    newPopupElement.querySelector('.popup__type').remove();
  }

  if (offer.rooms >= 0 && offer.guests >= 0) {
    newPopupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declineRoomWord(parseInt(offer.rooms, 10))} для ${offer.guests} ${parseInt(offer.guests, 10) === 1 ? 'гостя' : 'гостей'}`;
  } else {
    newPopupElement.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin && offer.checkout) {
    newPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    newPopupElement.querySelector('.popup__text--time').remove();
  }

  if (offer.description) {
    newPopupElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    newPopupElement.querySelector('.popup__description').remove();
  }

  if (author.avatar) {
    newPopupElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    newPopupElement.querySelector('.popup__avatar').remove();
  }

  if (offer.photos) {
    newPopupElement.querySelector('.popup__photos').innerHTML = '';
    newPopupElement.querySelector('.popup__photos').append(createPhotos(offer.photos));
  } else {
    newPopupElement.querySelector('.popup__photos').remove();
  }

  if (offer.features) {
    renderFeatures(newPopupElement, offer.features);
  } else {
    newPopupElement.querySelector('.popup__features').remove();
  }
  return newPopupElement;
};

export {createPopup};
