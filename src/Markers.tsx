import React, { Component, createRef } from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import Leaflet, { LatLng } from 'leaflet';
import { copyToClipboard } from './copyToClipboard';

export class CopyPositionMarker extends Component {
  ref: any = createRef();

  icon = Leaflet.icon({
    iconUrl: 'images/hut.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });


  copyPositionToClipboard(position: LatLng) {
    copyToClipboard(`lat: ${position.lat},\nlng: ${position.lng},`)
  }
  
  render() {
    return <Marker icon={this.icon} ref={this.ref} position={[0, 0]} ondragend={() => { this.copyPositionToClipboard(this.ref.current.leafletElement.getLatLng()) }} draggable></Marker>
    ;
  }
}

export const VillageMarker = (props: MarkerProps) => {
  const propsWithIcon = {
    ...props,
    icon: Leaflet.icon({
      iconUrl: 'images/hut.png',
      iconSize: [25, 25],
      iconAnchor: [12.5, 25],
      popupAnchor: [0, -25],
      tooltipAnchor: [0, -25],
    }),
  };

  return <Marker {...propsWithIcon}>{props.children}</Marker>;
}

export const TownMarker = (props: MarkerProps) => {
  const propsWithIcon = {
    ...props,
    icon: Leaflet.icon({
      iconUrl: 'images/town.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -25],
      tooltipAnchor: [0, -25],
    }),
  };

  return <Marker {...propsWithIcon}>{props.children}</Marker>;
}

export const CityMarker = (props: MarkerProps) => {
  const propsWithIcon = {
    ...props,
    icon: Leaflet.icon({
      iconUrl: 'images/city.png',
      iconSize: [35, 35],
      iconAnchor: [17.5, 35],
      popupAnchor: [0, -32],
      tooltipAnchor: [0, -32],
    }),
  };

  return <Marker {...propsWithIcon}>{props.children}</Marker>;
}