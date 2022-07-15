import {createPopup} from './popup.js';

const DEFAULT_MAP_SCALE = 12;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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

const createAdPinMarkers = (properties) => {
  properties.forEach((property) => {
    const marker = L.marker(
      {
        lat: property.location.lat,
        lng: property.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );

    marker.addTo(markerGroup).bindPopup(createPopup(property));
  });
};

const setAdPins = (properties) => {
  markerGroup.clearLayers();
  createAdPinMarkers(properties);
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainPinMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

export {setAdPins, setOnMapLoad, setOnMainPinMove, initMap};

