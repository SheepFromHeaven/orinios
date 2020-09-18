import React, { Component } from 'react';
import './App.css';
import { LayerGroup, Map, TileLayer, LayersControl, Tooltip, Polygon } from 'react-leaflet';
import overlayMaps from './data/overlayMaps';
import 'leaflet/dist/leaflet.css';
import { VillageMarker, CopyPositionMarker }  from './Markers';

class App extends Component {
  createLayerGroup(config: any) {
    const MarkerComponent = config.component || VillageMarker;
    return (
      <LayersControl.Overlay name={config.name}>
        <LayerGroup>
          {config.markers.map((marker: any) => <MarkerComponent position={[marker.lat, marker.lng]}><Tooltip direction='top'>{marker.tooltip}</Tooltip></MarkerComponent>)}
        </LayerGroup>
      </LayersControl.Overlay>
    )
  }

  render(): any {
    return <div className="App">
      <Map className="Map" center={[0, 0]} maxBounds={[[85, -180], [-85, 180]]} maxBoundsViscosity={.8} zoom={2}>
        <TileLayer
          url="./images/map/{z}/{x}/{y}.png"
          tileSize={256}
          maxZoom={5}
        />
        <LayersControl position="bottomright">
          {overlayMaps.map(this.createLayerGroup)}
        </LayersControl>
        <Polygon positions={[
          [0,0],
          [20,20]
        ]}></Polygon>

        {/* <CopyPositionMarker></CopyPositionMarker> */}
      </Map>
    </div>
  }
}

export default App;
