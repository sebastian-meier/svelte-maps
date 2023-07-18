<script>
  import Map from "./OpenLayers/Map.svelte";
  import Marker from "./D3/Marker.svelte";
  import Polygon from "./D3/Polygon.svelte";
  import { loaded, locations } from "../../stores/locations";
  import {onMount} from 'svelte';

  /**
   * @type {?any} pathGeom
   */
  let pathGeoms;

  onMount(async()=>{
    pathGeoms = await fetch('https://fhpcloud.fh-potsdam.de/s/xwZgpNdT8pDix8z/download/brandenburg-84.geojson', { mode: 'no-cors'})
			.then(d => d.json());
  });
</script>

<!--<Map>
  {#if $loaded && $locations}
    {#if pathGeoms}
      <Polygon coordinates={pathGeoms} />
    {/if}
    {#each $locations as l, li}
      <Marker coordinates={l.coordinates} id={li} />
    {/each}
  {/if}
</Map>-->

<Map />

