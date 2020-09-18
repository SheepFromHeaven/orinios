import { VillageMarker, TownMarker, CityMarker, ObeliskMarker } from './../Markers';
import cities from './markers/cities';
import locations from './markers/locations';
import towns from './markers/towns';
import villages from './markers/villages';

export default [
  {
    name: 'Villages',
    markers: villages,
    component: VillageMarker,
  },
  {
    name: 'Towns',
    markers: towns,
    component: TownMarker,
  },
  {
    name: 'Cities',
    markers: cities,
    component: CityMarker,
  },
  {
    name: 'Locations',
    markers: locations,
    component: ObeliskMarker,
  },
]