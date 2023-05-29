<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import type { Item, OfferList } from '$lib/types.js';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	export let data;
	const offerList: Item[] = data.offerList;

	console.log(offerList);

	function handleChange(e: any) {
		console.log(e.target.value);
	}
</script>

<AppBar>
	<div class="flex gap-6">
		<Logo />
		<form on:submit={handleChange} class="flex gap-3">
			<input
				placeholder="Puesto, empresa ó palabra clave... "
				class="input min-w-[270px]"
				type="search"
				name="offers"
				id="offers"
				on:change={handleChange}
			/>
			<button class="btn variant-filled-warning uppercase">Buscar ofertas</button>
		</form>
	</div>
	<LightSwitch />
</AppBar>

<div class="container h-full mx-auto flex mt-6">
	<ul>
		{#each offerList as offer}
			<li class="mb-4">
				<a href={offer.link}>
					<div class="card rounded-sm p-6 grid grid-cols-[100px_1fr]">
						<aside class="m-auto ">
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
								<small class="chip rounded-full variant-soft">{offer.teleworking?.value || 'No especifico'}</small>
								{#if offer.salaryMin.value}
									<small class=" chip rounded-full variant-filled-success text-sm"> {offer.salaryMin.value} </small>
								{/if}
							</footer>
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
