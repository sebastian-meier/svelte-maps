<script>
    import {onMount, onDestroy, setContext} from 'svelte'
    import { mapKey } from "./context.js";
	import L from 'leaflet';

	/**
     * @type {?any} map
     */
    export let map = null;

    setContext(mapKey, {
        getMap: () => map
    });

    let container;

    onMount(async()=>{
        map = L.map(container, { preferCanvas: true }).setView([13.3727, 52.6098].reverse(), 9);
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
            attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
                &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
            subdomains: 'abcd',
            maxZoom: 14,
            }
        ).addTo(map);
    });

    onDestroy(async() => {
        if (map) {
            map.remove();
			map = null;
        }
    });
	
	function resizeMap() {
	  if(map) { map.invalidateSize(); }
    }

</script>

<svelte:window on:resize={resizeMap} />

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""/>
</svelte:head>

<div class="map" id="map" bind:this={container}>
    {#if map}
        <slot />
    {/if}
</div>

<style>
    #map {
        width: 100%;
        height: 100vh;
    }
</style>