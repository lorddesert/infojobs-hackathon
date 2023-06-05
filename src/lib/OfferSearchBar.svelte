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
	<label for="offerSearch" id="offerSearch">
		<input
			placeholder="Puesto, empresa ó palabra clave... "
			class={`input w-min
      ${isEmptyString && 'input-warning'}
      ${isNotFound && 'input-error'}`}
			type="search"
			name="offerSearch"
			id="offerSearch"
		/>
		<!-- {#if errorMessage}
			<p class=" w-fit">{errorMessage}</p>
		{/if} -->
	</label>
	<button class={`btn  variant-filled-warning `}> BUSCAR OFERTAS </button>
</form>
