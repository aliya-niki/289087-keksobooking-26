import {isEscapeKey} from './util.js';

const renderMessage = (id) => {
  const messageElement = document.querySelector(id)
    .content
    .querySelector('div');

  const newMessageElement = messageElement.cloneNode(true);

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  };

  const onMessageClose = () => {
    removeMessage();
  };

  function removeMessage () {
    newMessageElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  newMessageElement.addEventListener('click', onMessageClose);

  document.body.insertAdjacentElement('beforeend', newMessageElement);
};

export {renderMessage};
