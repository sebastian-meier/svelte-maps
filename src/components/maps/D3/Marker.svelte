<script>
	import { getContext } from 'svelte';
    import { projKey } from './context';
    import { currentLocationID } from '../../../stores/locations';

    /**
     * @type {number[]} coordinates
     */
    export let coordinates;

    /**
     * @type {number} id
     */
    export let id;

    const projContext = getContext(projKey);
    let projection = projContext.getProj();

    $: cx = $projection(coordinates)[0];
    $: cy = $projection(coordinates)[1];

</script>

<circle
    role="button"
    tabindex="0"
    on:keydown={() => { currentLocationID.set(id) }}
    on:click={() => { currentLocationID.set(id) }}
    class:active={id === $currentLocationID}
    cx={cx} cy={cy} r=5 ></circle>
	
<style>
	circle {
		fill: #000000;
        stroke: white;
        stroke-width: 2px;
        cursor: pointer;
        outline: none;
	}
	
	circle.active {
		fill: #ff0000;
	}
</style>