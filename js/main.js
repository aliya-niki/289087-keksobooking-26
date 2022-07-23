import {getData, sendData} from './api.js';
import {DEFAULT_CENTRE_COORDINATE, SIMILAR_PROPERTIES_MAX_NUMBER, showGetDataError} from './util.js';
import './popup.js';
import {setAdPins, setOnMapLoad, initMap} from './map.js';
import {setOnFiltersApply, resetFilters} from './filters.js';
import {disableAdForm, disableFilters, enableAdForm, enableFilters} from './toggle-forms-disabled.js';
import {setOnAdFormSubmit, clearAdForm, unblockSubmitButton} from './form.js';
import {renderMessage} from './render-message.js';

const SUCCESS_MESSAGE_ID = '#success';
const ERROR_MESSAGE_ID = '#error';

const onDataGetSuccess = (data) => {
  enableFilters();
  setAdPins(data.slice(0, SIMILAR_PROPERTIES_MAX_NUMBER));
  setOnFiltersApply(data);
};

const onDataGetError = (message) => {
  showGetDataError(message);
};

const onDataSendSuccess = () => {
  clearAdForm();
  resetFilters();
  renderMessage(SUCCESS_MESSAGE_ID);
  unblockSubmitButton();
};

const onDataSendError = () => {
  renderMessage(ERROR_MESSAGE_ID);
  unblockSubmitButton();
};

disableAdForm();
disableFilters();
setOnMapLoad(enableAdForm);
initMap(DEFAULT_CENTRE_COORDINATE);

getData(onDataGetSuccess, onDataGetError);

setOnAdFormSubmit(async (data) => {
  await sendData(onDataSendSuccess, onDataSendError, data);
});
