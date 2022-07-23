import {createPopup} from './popup.js';

const DEFAULT_MAP_SCALE = 12;
const MAIN_PIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const AD_PIN = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon(MAIN_PIN);
const adPinIcon = L.icon(AD_PIN);

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const initMap = (coordinate) => {
  map.setView(coordinate, DEFAULT_MAP_SCALE);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinate).addTo(map);
};

const createAdPinMarkers = (adverts) => {
  adverts.forEach((advert) => {
    const marker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );

    marker.addTo(markerGroup).bindPopup(createPopup(advert));
  });
};

const setAdPins = (adverts) => {
  markerGroup.clearLayers();
  createAdPinMarkers(adverts);
};

const setOnMapLoad = (callback) => {
  map.on('load', callback);
};

const setOnMainPinMove = (callback) => {
  mainPinMarker.on('move', (evt) => callback(evt.target.getLatLng()));
};

const setMainPinCoordinate = (coordinate) => {
  mainPinMarker.setLatLng(coordinate);
};

export {setAdPins, setOnMapLoad, setOnMainPinMove, initMap, setMainPinCoordinate};

