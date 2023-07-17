<script>
  import Map from "./D3/Map.svelte";
  import Marker from "./D3/Marker.svelte";
  import Polygon from "./D3/Polygon.svelte";
  import { loaded, locations } from "../../stores/locations";
  import {onMount} from 'svelte';

  /**
   * @type {?any} pathGeom
   */
  let pathGeoms;

  onMount(async()=>{
    pathGeoms = await fetch('http://localhost:5174/src/lib/data/brandenburg-84.geojson')
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

