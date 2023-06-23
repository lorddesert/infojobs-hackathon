<script lang="ts">
  type Data = {
    count: number
    name: string
  }

	export let data: Data[] = [];
</script>

<ul>
	{#each data as  {name, count}}
		<li>
			<label for={`contract-type-${name}`}>
				<input type="checkbox" name="contract-type" id={`contract-type-${name}`} />
        {count}
        {name}
			</label>
		</li>
	{/each}
</ul>
