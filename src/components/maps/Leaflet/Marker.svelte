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
  
    import { onDestroy, getContext } from "svelte";
    import { mapKey } from "./context.js";
    import L from "leaflet";
  
    const mapContext = getContext(mapKey);
    const map = mapContext.getMap();

    const defaultIcon = L.icon({
        iconUrl: '/src/lib/images/default-marker.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    const activeIcon = L.icon({
        iconUrl: '/src/lib/images/active-marker.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

  
    const marker = new L.Marker(coordinates, { icon: defaultIcon }).addTo(map);
  
    marker.on('click', () => {
      currentLocationID.set(id);
    });
  
    $: marker.setLatLng(coordinates.reverse());
    $: {
      if (id == $currentLocationID) {
        marker.setIcon(activeIcon);
      } else {
        marker.setIcon(defaultIcon);
      }
    }  
  
    onDestroy(() => {
      marker.remove();
    });
  </script>
  
  <slot />
  