<script>
	import Details from '../components/Details.svelte';
	import List from '../components/List.svelte';
	import Map from '../components/maps/Map.svelte';
	import { loaded, currentLocationID } from '../stores/locations';
	import './styles.css';
</script>

<svelte:head>
	<title>Bathing Locations</title>
	<meta name="description" content="Let's go swimming!" />
</svelte:head>

<main>
	{#if $loaded}
	<div id="sidebar">
		{#if currentLocationID}
		<Details />
		{/if}
		<List />
	</div>
	<div id="mapcontainer">
	<Map />
	</div>
	{:else}
	<div id="loading">
		Loading...
	</div>
	{/if}
</main>

<style>
	main {
		display:flex;
		flex-direction: row;
	}

	#sidebar {
		display: flex;
		flex-direction: column;
		width: 25%;
		max-height: 100vh;
		overflow:scroll;
	}

	#mapcontainer {
		flex-grow: 1;
		height: 100vh;
	}
</style>
