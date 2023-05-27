<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	export let data;

	function handleChange(e: any) {
		console.log(e.target.value);
	}
</script>

<AppBar>
	<form on:submit={handleChange} class="flex gap-3">
		<input class="input" type="search" name="offers" id="offers" on:change={handleChange} />
		<button class="btn variant-filled-secondary">Buscar ofertas</button>
	</form>
</AppBar>

<div class="container h-full mx-auto flex">
	<ul>
		{JSON.stringify(data)}
	</ul>
</div>
