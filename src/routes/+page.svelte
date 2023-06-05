<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { Item } from '$lib/types.js';
	import { offerList as storedOffers } from '$lib/store';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let data;
	let offerList: Item[] = data.offerList;
	let page = {
		offset: 0,
		limit: 20,
		size: offerList.length,
		amounts: [1, 2, 5, 10]
	};

	storedOffers.subscribe((newOffers) => {
		if (newOffers.length) offerList = newOffers;

		console.log(newOffers);
	});
</script>

<Header />

<main>
	<div class="container h-full mx-auto flex mt-6">
			<ul>
				{#each offerList as offer}
					<li class="mb-4">
						<a href={offer.link}>
							<div class="card rounded-sm p-6 grid grid-cols-[100px_1fr]">
								<aside class="m-auto">
									<img
										class=" w-20 rounded-md"
										src={offer.author.logoUrl || 'fallback-company-logo.png'}
										alt={offer.author.name}
									/>
								</aside>

								<div>
									<header>
										<h3>
											{offer.title}
										</h3>
										<a class="text-cyan-700 hover:underline" href={offer.author.uri}>
											<h4>
												{offer.author.name}
											</h4>
										</a>
									</header>

									<footer class=" flex gap-2 mt-4">
										<small class="chip rounded-full variant-soft"
											>{offer.teleworking?.value || 'No especifico'}</small
										>
										{#if offer.salaryMin.value}
											<small class=" chip rounded-full variant-filled-success text-sm">
												{offer.salaryMin.value}
											</small>
										{/if}
									</footer>
								</div>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		<Paginator  bind:settings={page}>
		</Paginator>
	</div>
</main>
