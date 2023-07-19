<script>
  import { onMount } from "svelte";
  import { Deck } from "@deck.gl/core";
  import { ScatterplotLayer } from "@deck.gl/layers";

  import { onDestroy, getContext } from "svelte";
  import { mapKey } from "../MapBox/context.js";
	import { currentLocationID, loaded, locations } from "../../../stores/locations.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  let canvasElement;
  let deck = null;
  let scatterlayer = null;

  let viewState = {};

  const updateLocations = () => {
    if (deck && $locations && $loaded) {
      scatterlayer = new ScatterplotLayer({
        getPosition: d => d.coordinates,
        getFillColor: (d, i) => {
          if (i.index === $currentLocationID) {
            return [255, 0, 0, 255];
          }
          return [0, 0, 0, 255];
        },
        getLineColor: [255, 255, 255, 255],
        getRadius: 5,
        lineWidthMinPixels:1,
        getLineWidth: 1,
        stroked: true,
        pickable: true,
        radiusUnits:'pixels',
        lineWidthUnits: 'pixels',
        data: [...$locations],
        onClick: (e) => {
          currentLocationID.set(e.index);
        }
      });

      deck.setProps({
        layers: scatterlayer
      })
    }
  };

  $: $currentLocationID, updateLocations();

  onMount(() => {
    const c = map.getCenter();
    const z = map.getZoom();
    const p = map.getPitch();
    const b = map.getBearing();
    
    viewState = {
      longitude: c.lng,
      latitude: c.lat,
      zoom: z,
      pitch: p,
      bearing: b,
    };

    deck = new Deck({
      canvas: canvasElement,
      width: "100%",
      height: "100%",
      initialViewState: viewState,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
    });

    updateLocations();
  });

</script>

<canvas id="deck" bind:this={canvasElement}></canvas>

<style>
  #deck {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
