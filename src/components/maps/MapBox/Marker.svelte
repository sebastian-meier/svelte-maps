<script>
  import { currentLocationID } from "../../../stores/locations";

  /**
   * @type {number[]} coordinates
   */
  export let coordinates;

  /**
   * @type {number} id
   */
  export let id;

  import { onDestroy, getContext, setContext } from "svelte";
  import { mapKey, markerKey } from "./context.js";
  import mapboxgl from "mapbox-gl";

  setContext(markerKey, {
    getMarker: () => marker,
  });

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const marker = new mapboxgl.Marker({ color: "#ffffff"}).setLngLat(coordinates).addTo(map);

  marker.getElement().addEventListener('click', () => {
    currentLocationID.set(id);
  });

  $: marker.setLngLat(coordinates);
  $: {
    const el = marker.getElement().querySelector('path');
    if (id == $currentLocationID) {
      el.setAttribute('fill', '#ff0000');
    } else {
      el.setAttribute('fill', '#ffffff');
    }
  }  

  onDestroy(() => {
    marker.remove();
  });
</script>

<slot />
