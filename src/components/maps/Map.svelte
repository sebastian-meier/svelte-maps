<script>
  import Map from "./OpenLayers/Map.svelte";
  // import Marker from "./MapBox/Marker.svelte";
  import { loaded, locations } from "../../stores/locations";
</script>

<!--<Map>
  {#if $loaded && $locations}
  {#each $locations as l, li}
    <Marker coordinates={l.coordinates} id={li} />
  {/each}
  {/if}
</Map>-->

<Map />

