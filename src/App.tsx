import React, { Component, createRef } from 'react';
import './App.css';
import { LayerGroup, Map, TileLayer, LayersControl, Tooltip, Polygon } from 'react-leaflet';
import overlayMaps from './data/overlayMaps';
import 'leaflet/dist/leaflet.css';
import { VillageMarker, CopyPositionMarker } from './Markers';
import { LatLng, LatLngExpression } from 'leaflet';
import { soakedSouth, movingPlains } from './data/areas';
import { copyToClipboard } from './copyToClipboard';
import { coastline, innerBorder } from './data/memory';

interface Areas {
  soakedSouth: LatLngExpression[];
  movingPlains: LatLngExpression[];
}

interface AppState {
  zoom: number;
  areas: Areas;
  currentLayer: keyof Areas;
}

class App extends Component<null, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      areas: {
        soakedSouth,
        movingPlains
      },
      currentLayer: 'movingPlains',
      zoom: 5
    };
  }

  mapRef: any = createRef();

  createLayerGroup(config: any) {
    const MarkerComponent = config.component || VillageMarker;
    return (
      <LayersControl.Overlay name={config.name} checked={true}>
        <LayerGroup>
          {config.markers.map((marker: any) => <MarkerComponent position={marker.position}><Tooltip direction='top'>{marker.tooltip}</Tooltip></MarkerComponent>)}
        </LayerGroup>
      </LayersControl.Overlay>
    )
  }

  formats = {
    marker: 'lat: $lat,\nlng: $lng,',
    point: '[$lat, $lng],'
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.metaKey && e.key === 'z') {
        this.setState({
          areas: {
            ...this.state.areas,
            [this.state.currentLayer]: this.state.areas[this.state.currentLayer].slice(0, -1)
          }
        });
        copyToClipboard(JSON.stringify(this.state.areas[this.state.currentLayer]))
      }
    })
  }

  render(): any {
    const currentPoly: LatLngExpression[] = this.state.areas[this.state.currentLayer];
    return <div className="App">
      <Map
        ref={this.mapRef}
        className="Map"
        onzoomend={(e) => {
          this.setState({ zoom: this.mapRef.current.leafletElement.getZoom() });
        }}
        center={[27.802032099279508, -117.56881713867189]}
        maxBounds={[[85, -180], [-85, 180]]}
        maxBoundsViscosity={.8}
        zoom={5}>
        <TileLayer
          url="./images/map/{z}/{x}/{y}.png"
          tileSize={256}
          maxZoom={5}
        />
        <LayersControl position="bottomright">
          {overlayMaps.map(this.createLayerGroup)}
        </LayersControl>
        {/* <Polygon positions={currentPoly}>
          <Tooltip direction='top'>{this.state.currentLayer}</Tooltip>
        </Polygon>
        <Polygon positions={soakedSouth as any} color={'tomato'}>
          <Tooltip direction='top'>Soaked South</Tooltip>
        </Polygon> */}

        {/* <CopyPositionMarker 
          format={this.formats.point}
          position={currentPoly[currentPoly.length - 1]}
          ondrop={
            (position: LatLng) => {
              this.setState(
                {
                  areas: {
                  ...this.state.areas,
                  [this.state.currentLayer]: [
                    ...currentPoly,
                    [position.lat, position.lng] as LatLngExpression
                  ]
                }
              }
              );
              copyToClipboard(JSON.stringify(this.state.areas[this.state.currentLayer]))
            }
          }></CopyPositionMarker> */}

        {/* <CopyPositionMarker
          format={this.formats.point}
          position={[27.802032099279508, -117.56881713867189]}
        ></CopyPositionMarker> */}
      </Map>
    </div>
  }
}

export default App;
