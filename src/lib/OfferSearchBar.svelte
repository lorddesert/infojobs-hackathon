<script lang="ts">
	import { offerList } from '$lib/store';
	import Loader from './Loader.svelte';

	// State
	let errorMessage = '';
	let isEmptyString = false;
	let isNotFound = false;
	let isSubmitting = false;

	// Functions
	function handleChange() {
		// Is pointing to the offerSearch form
		//@ts-ignore
		const query = this[0].value;

		if (!query) return;

		isSubmitting = true;

		getOffers(query);
	}

	export async function getOffers(query: string) {
		if (!query) {
			isEmptyString = true;
			errorMessage = 'Necesitas escribir algo!';
			return;
		}

		resetInputErrorState();

		const response = await fetch(`/api/offer?q=${query}`);

		const data = await response.json();

		if (!response.ok) {
			errorMessage = data.message;
			return;
		}

		if (!data.offers.length) {
			errorMessage = 'No se encontraron resultados para esa busqueda';
			isSubmitting = false;
			return;
		}

		offerList.set(data.offers);
		isSubmitting = false;
	}

	function resetInputErrorState() {
		isEmptyString = false;
		isNotFound = false;
		errorMessage = '';
	}
</script>



<form on:submit={handleChange} class="flex gap-3" name="offerSearch">
	<div class="">
		<input
			placeholder="Puesto, empresa ó palabra clave... "
			class={`input border
					${isEmptyString && 'input-warning'}
					${isNotFound && 'input-error'}`}
			type="search"
			name="offerSearch"
			id="offerSearch"
			disabled={isSubmitting}
		/>
		{#if errorMessage}
			<span>{errorMessage}</span>
		{/if}
	</div>

	<button
		class={`btn h-min search-btn
		variant-filled-warning  `}
		disabled={isSubmitting}
	>
		{#if isSubmitting}
			<Loader />
		{:else}
			<img src="/search.svg" class="search-image" alt="search" />
		{/if}
		<span>
			{#if isSubmitting}
				BUSCANDO
			{:else}
				BUSCAR OFERTAS
			{/if}
		</span>
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
