<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { Item } from '$lib/types.js';
	import { offerList as storedOffers } from '$lib/store';
	import Aside from '$lib/Aside.svelte';
	import Offer from '$lib/Offer.svelte';
	export let data;
	let offerList: Item[] = data.offerList;
	// let searchParam = ''
	storedOffers.subscribe((newOffers) => {
		if (newOffers.length) offerList = newOffers;
	});
</script>

<Header />

<h1 class="h5 mb-3">{offerList.length} resultados</h1>
<div class="flex gap-3  max-w-[1280px] mx-auto my-0">
	<Aside />
	<main class="container h-full mx-auto flex mr-6">
		<!-- <h2>{offerList.length} ofertas de {searchParam}</h2> -->
		<div>
			<ul>
				{#each offerList as offer}
					<li class="mb-4">
						<Offer {offer} />
					</li>
				{/each}
			</ul>
		</div>
	</main>
</div>
