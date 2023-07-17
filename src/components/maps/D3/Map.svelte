<script>
    import {setContext} from 'svelte'
    import { projKey } from "./context.js";
    import { geoEqualEarth } from "d3-geo";
    import {writable} from 'svelte/store';

	/**
     * @type {?any} map
     */
    let proj = writable(null);

    setContext(projKey, {
        getProj: () => proj
    });

    $: {
        $proj = geoEqualEarth()
            .scale(20000)
            .center([13.3727, 52.6098])
            .translate([width / 2, height / 2]);
    }

    /**
     * @type {number} width
     */
    let width = 100;

    /**
     * @type {number} height
     */
    let height = 100;
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
    <svg viewBox="0 0 {width} {height}">
        <slot />
    </svg>
</div>

<style>
	svg, div {
        width: 100%;
        height: 100vh;
    }
</style>