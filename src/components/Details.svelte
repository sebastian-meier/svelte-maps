<script>
  import { loaded, locations, currentLocationID, currentLocation } from "../stores/locations";
</script>

{#if $loaded && $currentLocationID && $locations}
<div>
  <button on:click={() => { currentLocationID.set(null); }}>x</button>
  <h2>{$currentLocation?.Name}</h2>
  <div>{@html $currentLocation?.description}</div>
</div>
{/if}


<style>
  div {
    padding: 20px;
  }

  div div{
    padding: 0;
    font-size: 12px;
  }

  h2{
    font-size: 18px;
  }

  button {
    text-align:center;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    float:right;
    overflow:hidden;
    padding: 0 2.5px;
  }
</style>