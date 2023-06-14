<script lang='ts'>
	import type { Item } from "./types";

  export let offer: Item
</script>


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
          <h3 class="h3">{offer.title}</h3>
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
