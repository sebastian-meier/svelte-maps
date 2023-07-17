<script>
  import Map from "./D3/Map.svelte";
  import Marker from "./D3/Marker.svelte";
  import Polygon from "./D3/Polygon.svelte";
  import { loaded, locations } from "../../stores/locations";
  import {onMount} from 'svelte';
  import { PUBLIC_DATA_PATH } from '$env/static/public';

  /**
   * @type {?any} pathGeom
   */
  let pathGeoms;

  onMount(async () => {
    pathGeoms = await fetch(PUBLIC_DATA_PATH + 'brandenburg-84.geojson')
			.then(d => d.json());
  });
</script>

<Map>
  {#if $loaded && $locations}
    {#if pathGeoms}
      <Polygon coordinates={pathGeoms} />
    {/if}
    {#each $locations as l, li}
      <Marker coordinates={l.coordinates} id={li} />
    {/each}
  {/if}
</Map>

<!-- <Map /> -->

