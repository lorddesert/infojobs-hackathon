<script lang="ts">
	import { offerList } from '$lib/store';
	// export let getOffers: (query: string) => Item[]
	let errorMessage = '';
	let isEmptyString = false;
	let isNotFound = false;

	function handleChange() {
		// Is pointing to the offerSearch form
		//@ts-ignore
		const query = this[0].value;

		getOffers(query);
	}

	async function getOffers(query: string) {
		if (!query) {
			isEmptyString = true;
			errorMessage = 'Necesitas escribir algo!';
			return;
		}

		resetInputErrorState();

		const response = await fetch(`/api/offer?q=${query}`);

		const data = await response.json();

		console.log(data);

		if (!response.ok) {
			errorMessage = data.message;
			return;
		}

		offerList.set(data.offers);
	}

	function resetInputErrorState() {
		isEmptyString = false;
		isNotFound = false;
		errorMessage = '';
	}
</script>

<form on:submit={handleChange} class="flex gap-3" name="offerSearch">
	<input
		placeholder="Puesto, empresa ó palabra clave... "
		class={`input w-min
      ${isEmptyString && 'input-warning'}
      ${isNotFound && 'input-error'}`}
		type="search"
		name="offerSearch"
		id="offerSearch"
	/>
	<button class={`btn variant-filled-warning search-btn `}>
		<img src="/search.svg" class="search-image" alt="search" />
		<span>BUSCAR OFERTAS</span>
	</button>
</form>

<style>
	.search-image {
		/* display: none; */
		max-width: 25px;
		max-height: 25px;
	}

	@media (max-width: 700px) {
		.search-btn span {
			display: none;
		}

		.search-image {
			display: block;
		}
	}
</style>
