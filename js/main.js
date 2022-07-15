import {createProperties} from './data.js';
import './popup.js';
import './load.js';
import {setAdPins, setOnMapLoad, initMap} from './map.js';
import './filters.js';
import {disableForms, enableForms} from './toggle-forms-disabled.js';
import './form.js';
import './upload.js';

const properties = createProperties();

const TOKIO_CENTRE_COORDINATE = {
  lat: 35.68027,
  lng: 139.75829,
};

disableForms();
setOnMapLoad(enableForms);
initMap(TOKIO_CENTRE_COORDINATE);
setAdPins(properties);

