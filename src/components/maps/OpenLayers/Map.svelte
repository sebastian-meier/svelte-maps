<script>
  /*
   * https://openlayers.org/en/latest/examples/mapbox-vector-tiles.html
   * https://github.com/Wildsong/svelte-maps/blob/main/src/olmap.svelte
   */
  import {onMount, onDestroy, setContext} from 'svelte'
  import Map from 'ol/Map'
  import View from 'ol/View'
  import { Point } from 'ol/geom'
  import TileLayer from 'ol/layer/Tile'
  import VectorSource from 'ol/source/Vector'
  import VectorLayer from 'ol/layer/Vector'
  import XYZ from 'ol/source/XYZ'
  import Feature from 'ol/Feature'
  import Style from 'ol/style/Style'
  import Icon from 'ol/style/Icon'
  import { fromLonLat } from 'ol/proj'
  import { locations, currentLocationID } from '../../../stores/locations.js'
  import defaultMarkerSrc from '$lib/images/default-marker.png';
  import activeMarkerSrc from '$lib/images/active-marker.png';

  /**
   * @type {?any} map
   */
  export let map = null;

  /**
   * @type {?VectorLayer<VectorSource>} markerLayer
   */
  export let markerLayer = null;

  /**
   * @type {?VectorSource} markerLayer
   */
   export let markerSource = null;

  /**
   * @type {?VectorLayer<VectorSource>} activeLayer
   */
  export let activeLayer = null;

  /**
   * @type {?VectorSource} activeSource
   */
  export let activeSource = null;

  let container;

  $: {
    if (markerSource && activeSource && $locations) {
      markerSource.clear();
      markerSource.addFeatures($locations.filter((l, li) => li !== $currentLocationID).map(featureTransformer));
      markerLayer?.changed();

      activeSource.clear();
      activeSource.addFeatures($locations.filter((l, li) => li === $currentLocationID).map(featureTransformer));
      activeLayer?.changed();
    }
  }

  const featureTransformer = (f, fi) => {
    return new Feature({
      ...f,
      fid: fi, 
      geometry: new Point(fromLonLat(f.coordinates)) // 
    })
  };

  const defaultStyle = new Style({
    image: new Icon({
      anchor: [10, 10],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: defaultMarkerSrc,
      imgSize: [20, 20]
    }),
  });

  const activeStyle = new Style({
    image: new Icon({
      anchor: [10, 10],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: activeMarkerSrc,
      imgSize: [20, 20]
    }),
  });

  onMount(async()=>{
    markerSource = new VectorSource({
      features: ($locations || []).filter((l, li) => li !== $currentLocationID).map(featureTransformer)
    });

    markerLayer = new VectorLayer({
      source: markerSource,
      style: defaultStyle,
    });

    activeSource = new VectorSource({
      features: ($locations || []).filter((l, li) => li === $currentLocationID).map(featureTransformer)
    });

    activeLayer = new VectorLayer({
      source: activeSource,
      style: activeStyle,
    });

    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({ url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' })
        }),
        markerLayer,
        activeLayer
      ],
      view: new View({ 
        center: fromLonLat([13.3727, 52.6098]),
        zoom: 10
      })
    });

    map.on('singleclick', async (e) => {
      let feature = await markerLayer?.getFeatures(e.pixel);
      if (!feature || feature.length <= 0) {
        return;
      }
      currentLocationID.set(feature[0].get('fid'))
    });
  });

  onDestroy(async() => {
    if (map) {
      map.setTarget(null);
      map = null;
    }
  });
</script>
<div id="map" bind:this={container}></div>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>

