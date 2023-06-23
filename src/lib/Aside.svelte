<script lang="ts">
	import type { Item } from './types';
	import { offerList } from '$lib/store';
	import Legend from './Legend.svelte';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import CheckboxList from './CheckboxList.svelte';
	import Offer from './Offer.svelte';

	type WorkDay = {
		count: number
		name: string
	}

	type ContractType = {
		count: number
	}

	// State
	let offerType: string[] = [];
	let teleworking: string[] = [];
	let jobCategories: string[] = [];
	let jobSubcategories: string[] = [];
	let minStudyMap = new Map()
	let currentSalaryRange: number = 6000
	let workDay: Map<number, WorkDay> = new Map()
	let contractType: Map<number, ContractType> = new Map()


	// Subscription
	offerList.subscribe((offers) => {
		offers.forEach((offer: Item) => {
			if (!offerType.includes(offer.contractType.value))
				offerType.push(offer.contractType.value);

			if ('teleworking' in offer && !teleworking.includes(offer!.teleworking!.value))
				teleworking.push(offer!.teleworking!.value);

			if ('category' in offer && !jobCategories.includes(offer.category.value))
				jobCategories.push(offer.category.value);

			if ('subCategory' in offer && !jobSubcategories.includes(offer.subcategory.value))
				jobSubcategories.push(offer.subcategory.value);

			if (!minStudyMap.has(offer.study.id))
				minStudyMap.set(offer.study.id, offer.study.value)

			if (workDay.has(offer.workDay.id)) {
				workDay.get(offer.workDay.id)!.count ++
			
			} else {
				workDay.set(offer.workDay.id, { count: 1, name: offer.workDay.value })
			}

			if (!contractType.has(offer.contractType.id)) {
				contractType.set(offer.contractType.id, { count: 1 })
			
			} else {
				contractType.get(offer.contractType.id)!.count ++ 
			}

			
		});
	});
</script>

<aside class="grid max-w-[220px] min-w-[210px] h-min gap-5 rounded p-4 card">
	<form class=" text-sm">
		<fieldset id="sort-by-order-offers">
			<Legend>Ordenar ofertas</Legend>
			<label class="mb-2" for="published-date">
				<input class="mr-2" type="radio" id="published-date" checked name="order-by" />
				Fecha de publicación
			</label>
			<label for="relevance">
				<input class="mr-2" type="radio" id="relevance" name="order-by" />
				Relevancia
			</label>
		</fieldset>
		<fieldset id="keyword" class="flex justify-center items-end gap-2">
			<label for="keyword-input" class="label"
				>Palabra clave
				<input
					class="input text-sm rounded-sm active:border-primary-700"
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
			<CheckboxList data={offerType} />
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

		{#if teleworking.length}
			<fieldset id="sort-by-teleworking">
				<Legend>Presencial/trabajo</Legend>
				<ul>
					{#each teleworking as type}
						<li>
							<label for={`teleworking-type-${type}`}>
								<input
									type="checkbox"
									name={`teleworking-type-${type}`}
									id={`teleworking-type-${type}`}
								/>
								{type}
							</label>
						</li>
					{/each}
				</ul>
			</fieldset>
		{/if}

		<fieldset>
			<Legend>Categoría del puesto</Legend>
			<CheckboxList data={jobCategories} />
		</fieldset>

		<fieldset>
			<Legend>Estudios mínimos</Legend>
			<CheckboxList data={[...minStudyMap].map(item => item[1])} />
		</fieldset>

		<fieldset>
			<Legend>Experiencia (años)</Legend>
		</fieldset>
		<fieldset>
			<Legend>Salario mínimo</Legend>
			{currentSalaryRange}
			<RangeSlider name="range-slider" bind:value={currentSalaryRange} min={6_000} max={60_000} step={500}>
				<div class="flex justify-between items-center">
					<div class="text-xs">6K</div>
					<div class="text-xs">60K+</div>
				</div>
			</RangeSlider>
			<p>Sólo para ofertas con salario especificado</p>
		</fieldset>

		<fieldset>
			<Legend>Jornada Laboral</Legend>
			<CheckboxList list={[...workDay].map(item => item[1].name)} />
		</fieldset>

		<fieldset id="sort-by-offer-type">
			<Legend>Tipo de oferta</Legend>
			<CheckboxList list={offerType} />
		</fieldset>
		
	</form>
</aside>
