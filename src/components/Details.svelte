<script>
  import { loaded, locations, currentLocationID, currentLocation } from "../stores/locations";
</script>

{#if $loaded && $currentLocationID && $locations}
<div>
  <button on:click={() => { currentLocationID.set(null); }}>CLOSE</button>
  <h2>{$currentLocation?.Name}</h2>
  <div>{@html $currentLocation?.description}</div>
</div>
{/if}
