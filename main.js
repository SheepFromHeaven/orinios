import overlayMaps from './data/overlayMaps.js';

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
const map = L.map('map', {
  maxBounds: [[85, -180], [-85, 180]],
  maxBoundsViscosity: 0.8,
}).setView([0, 0], 3);

L.tileLayer('./images/map/{z}/{x}/{y}.png', {
  maxZoom: 5,
  noWrap: true,
}).addTo(map)

const marker = L.marker([0, 0], { draggable: true }).addTo(map);
marker.bindPopup('');

marker.on('dragend', () => {
  const popup = marker.getPopup();
  popup.setContent(`Lat: ${marker.getLatLng().lat}; Lang: ${marker.getLatLng().lng}`);
  popup.openOn(map);
  copyToClipboard(`lat: ${marker.getLatLng().lat},
  lng: ${marker.getLatLng().lng},`);
});
const overlays = overlayMaps.reduce((aggr, curr) => ({
  ...aggr,
  [curr.name]: L.layerGroup(curr.markers.map(marker => L.marker([marker.lat, marker.lng]).bindTooltip(marker.tooltip)))
}), {})
L.control.layers(null, overlays).addTo(map)