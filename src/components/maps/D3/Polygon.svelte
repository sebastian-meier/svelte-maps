<script>
	import { getContext } from 'svelte';
    import { projKey } from './context';
    import { geoPath } from 'd3-geo';

    /**
     * @type {?any} coordinates
     */
    export let coordinates;

    const projContext = getContext(projKey);
    let projection = projContext.getProj();

    $: calculatedPath = geoPath().projection($projection)(coordinates);
</script>

<path d={calculatedPath}></path>
	
<style>
	path {
		fill: transparent;
        stroke: rgb(28, 146, 206);
        stroke-width: 1px;
	}
</style>