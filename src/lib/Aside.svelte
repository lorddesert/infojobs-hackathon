<script lang="ts">
	import type { Item } from './types';
	import { offerList } from '$lib/store';
	import { each } from 'svelte/internal';
	import Legend from './Legend.svelte';

	// State
	let contractType: string[] = [];
	let teleworking: string[] = [];

	// Subscription
	offerList.subscribe((offers) => {
		offers.forEach((offer: Item) => {
			if (!contractType.includes(offer.contractType.value))
				contractType.push(offer.contractType.value);

			if ('teleworking' in offer && !teleworking.includes(offer!.teleworking!.value))
				teleworking.push(offer!.teleworking!.value);
		});
	});
</script>

<aside class="grid min-w-[250px] max-w-lg h-min gap-5 rounded p-5 m-6 card sticky top-6">
	<form>
		<fieldset id="sort-by-order-offers">
			<Legend>Ordenar ofertas</Legend>
			<label for="published-date">
				Fecha de publicación
				<input type="checkbox" checked name="published-date" id="published-date" />
			</label>
			<label for="relevance">
				<input type="checkbox" name="relenvance" id="relevance" />
				Relevancia
			</label>
		</fieldset>
		<fieldset id="keyword" class="flex justify-center items-end gap-2">
			<label for="keyword-input" class="label"
				>Palabra clave
				<input
					class="input border"
					type="search"
					value=""
					name="keyword-input"
					placeholder="Tecnología?"
				/>
			</label>
			<button class="btn h-min variant-ghost-primary">OK</button>
		</fieldset>

		<fieldset id="sort-by-offer-type">
			<Legend>Tipo de oferta</Legend>
			<ul>
				{#each contractType as type}
					<li>
						<input type="checkbox" name="contract-type" id={`contract-type-${type}`} />
						<label for={`contract-type-${type}`}>{type}</label>
					</li>
				{/each}
			</ul>
		</fieldset>

		<fieldset id="sort-by-date">
			<label for="any-date">
				<input type="checkbox" name="any-date" id="any-date" />
				Cualquier fecha
			</label>
			<label for="last-24-hours">
				<input type="checkbox" name="last-24-hours" id="last-24-hours" />
				Últimas 24 horas
			</label>
			<label for="last-7-days">
				<input type="checkbox" name="last-7-days" id="last-7-days" />
				Últimos 7 días
			</label>
			<label for="last-15-days">
				<input type="checkbox" name="last-15-days" id="last-15-days" />
				Últimos 15 días
			</label>
		</fieldset>

		<fieldset id="sort-by-teleworking">
			<Legend>
				Presencial/trabajo
			</Legend>
			<ul>
				{#each teleworking as type}
					<li>
						<label for={`teleworking-type-${type}`}>
							{type}
							<input
								type="checkbox"
								name={`teleworking-type-${type}`}
								id={`teleworking-type-${type}`}
							/>
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>

		<fieldset />
	</form>
</aside>
