import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import overlayMaps from '../data/overlayMaps.js';
import 'leaflet/dist/leaflet.css';
import { copyToClipboard } from './copyToClipboard';

function App() {
  const [popup, setPopup] = useState('');

// marker.on('dragend', () => {
//   const popup = marker.getPopup();
//   popup.setContent(`Lat: ${marker.getLatLng().lat}; Lang: ${marker.getLatLng().lng}`);
//   popup.openOn(map);
//   copyToClipboard(`lat: ${marker.getLatLng().lat},
//   lng: ${marker.getLatLng().lng},`);
// });
// const overlays = overlayMaps.reduce((aggr, curr) => ({
//   ...aggr,
//   [curr.name]: L.layerGroup(curr.markers.map(marker => L.marker([marker.lat, marker.lng]).bindTooltip(marker.tooltip)))
// }), {})
// L.control.layers(null, overlays).addTo(map)
  return (
    <div className="App">
      <Map className="Map" center={[0,0]} maxBounds={[[85, -180], [-85, 180]]} maxBoundsViscosity={.8} zoom={2}>
        <TileLayer
            url="./images/map/{z}/{x}/{y}.png"
            tileSize={256}
          />
          <Marker position={[0,0]} ondragend={(e) => {console.log(e)}} draggable>
            <Popup>{popup}</Popup>
          </Marker>
      </Map>
    </div>
  );
}

export default App;
