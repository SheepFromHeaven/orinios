import { VillageMarker, TownMarker, CityMarker } from './../Markers';
import cities from './markers/cities';
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
    component: CityMarker
  },
]