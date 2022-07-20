import {getData, sendData} from './api.js';
import {DEFAULT_CENTRE_COORDINATE, showGetDataError} from './util.js';
import './popup.js';
import {setAdPins, setOnMapLoad, initMap} from './map.js';
import './filters.js';
import {disableForms, enableForms} from './toggle-forms-disabled.js';
import {setOnAdFormSubmit, clearAdForm, unblockSubmitButton} from './form.js';
import {renderMessage} from './render-message.js';

const SUCCESS_MESSAGE_ID = '#success';
const ERROR_MESSAGE_ID = '#error';

const onDataGetSuccess = (data) => {
  setAdPins(data);
};

const onDataGetError = (message) => {
  showGetDataError(message);
};
// |--  +заблокировать фильтры

const onDataSendSuccess = () => {
  clearAdForm();
  renderMessage(SUCCESS_MESSAGE_ID);
  unblockSubmitButton();
};
// |--  +фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается
// |--  +если на карте был показан балун, то он должен быть скрыт

const onDataSendError = () => {
  renderMessage(ERROR_MESSAGE_ID);
  unblockSubmitButton();
};

disableForms();
setOnMapLoad(enableForms);
initMap(DEFAULT_CENTRE_COORDINATE);

getData(onDataGetSuccess, onDataGetError);

setOnAdFormSubmit(async (data) => {
  await sendData(onDataSendSuccess, onDataSendError, data);
});
