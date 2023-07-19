<script>
  import {onMount, onDestroy, setContext} from 'svelte'
  import maplibre from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
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
      map = new maplibre.Map({
        center: [13.3727, 52.6098],
        zoom: 9,
        container: 'map',
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${PUBLIC_MAPTILER_KEY}`,
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

