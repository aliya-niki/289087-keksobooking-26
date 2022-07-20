import {getData, sendData} from './api.js';
import {TOKIO_CENTRE_COORDINATE, showGetDataError} from './util.js';
import './popup.js';
import {setAdPins, setOnMapLoad, initMap, setMainPinCoordinate} from './map.js';
import './filters.js';
import {disableForms, enableForms} from './toggle-forms-disabled.js';
import {setOnAdFormSubmit, clearAdForm, unblockSubmitButton} from './form.js';
import {getMessage} from './get-message.js';

const onDataGetSuccess = (data) => {
  setAdPins(data);
};

const onDataGetError = (message) => {
  showGetDataError(message);
};
// |--  +заблокировать фильтры

const showSuccessMessage = () => {
  const messageElement = document.querySelector('#success')
    .content
    .querySelector('.success');

  const newMessage = getMessage(messageElement);
  document.body.insertAdjacentElement('beforeend', newMessage);
};

const onDataSendSuccess = () => {
  unblockSubmitButton();
  clearAdForm();
  setMainPinCoordinate(TOKIO_CENTRE_COORDINATE);
  showSuccessMessage();
};
// |--  +фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается
// |--  +если на карте был показан балун, то он должен быть скрыт

const showErrorMessage = () => {
  const messageElement = document.querySelector('#error')
    .content
    .querySelector('.error');

  const newMessage = getMessage(messageElement);
  document.body.insertAdjacentElement('beforeend', newMessage);
};

const onDataSendError = () => {
  showErrorMessage();
  unblockSubmitButton();
};

disableForms();
setOnMapLoad(enableForms);
initMap(TOKIO_CENTRE_COORDINATE);

getData(onDataGetSuccess, onDataGetError);

setOnAdFormSubmit(async (data) => {
  await sendData(onDataSendSuccess, onDataSendError, data);
});
