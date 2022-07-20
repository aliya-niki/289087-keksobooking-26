import {isEscapeKey} from './util.js';

const getMessage = (messageElement) => {
  const newMessageElement = messageElement.cloneNode(true);

  const closeButtonElement = newMessageElement.querySelector('button');

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

  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', removeMessage);
  }

  return newMessageElement;
};

export {getMessage};
