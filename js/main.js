import {getData, sendData} from './api.js';
import {DEFAULT_CENTRE_COORDINATE, SIMILAR_ADVERTS_MAX_NUMBER, showGetDataError} from './util.js';
import './popup.js';
import {setAdPins, setOnMapLoad, initMap} from './map.js';
import {setOnFiltersApply} from './filters.js';
import {toggleAdFormDisabled, toggleFiltersDisabled} from './toggle-forms-disabled.js';
import {setOnAdFormSubmit, clearForms, unblockSubmitButton} from './form.js';
import {renderMessage} from './render-message.js';

const SUCCESS_MESSAGE_ID = '#success';
const ERROR_MESSAGE_ID = '#error';

const onDataGetSuccess = (data) => {
  toggleFiltersDisabled(false);
  setAdPins(data.slice(0, SIMILAR_ADVERTS_MAX_NUMBER));
  setOnFiltersApply(data);
};

const onDataGetError = (message) => {
  showGetDataError(message);
};

const onDataSendSuccess = () => {
  clearForms();
  renderMessage(SUCCESS_MESSAGE_ID);
  unblockSubmitButton();
};

const onDataSendError = () => {
  renderMessage(ERROR_MESSAGE_ID);
  unblockSubmitButton();
};

toggleAdFormDisabled(true);
toggleFiltersDisabled(true);
setOnMapLoad(() => toggleAdFormDisabled(false));
initMap(DEFAULT_CENTRE_COORDINATE);

getData(onDataGetSuccess, onDataGetError);

setOnAdFormSubmit(async (data) => {
  await sendData(onDataSendSuccess, onDataSendError, data);
});
