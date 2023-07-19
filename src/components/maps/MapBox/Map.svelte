<script>
  import {onMount, onDestroy, setContext} from 'svelte'
  import mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { PUBLIC_MAPBOX_KEY } from '$env/static/public';
  import { mapKey } from "./context.js";

  /**
   * @type {?any} map
   */
  export let map = null;

  setContext(mapKey, {
    getMap: () => map
  });

  let container;

  onMount(async()=>{
      mapboxgl.accessToken=PUBLIC_MAPBOX_KEY;

      map = new mapboxgl.Map({
        center: [13.3727, 52.6098],
        zoom: 9,
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10'
      });
  });

  onDestroy(async() => {
    if (map) {
      map.remove();
      map = null;
    }
  });
</script>
<div id="map" bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>

<style>
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

