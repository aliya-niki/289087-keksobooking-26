import {createProperties} from './data.js';
import {createPopup} from './popup.js';
import './load.js';
import './map.js';
import './filters.js';
import './form.js';
import './upload.js';

const mapElement = document.querySelector('.map__canvas');
const properties = createProperties();

const popupElements = properties.map((property) => createPopup(property));

mapElement.append(popupElements[0]);
