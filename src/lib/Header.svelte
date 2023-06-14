<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import Logo from './Logo.svelte';
	import OfferSearchBar from './OfferSearchBar.svelte';

	/* 
	background-color: #fff;
margin: 0 auto;
max-height: 80px;
max-width: 1280px;
	*/
	/* 
	
	align-items: center;
display: flex;
padding: 0 16px;
position: relative;
	*/
</script>

<div class="bg-white">
	<header class="mx-auto my-0 max-h-20 max-w-[1280px]">
		<div class="flex items-center gap-7 px-4 relative h-[80px]">
			<Logo />
			<!-- <OfferSearchBar getOffers={getOffers}/> -->
			<OfferSearchBar />
		</div>
	</header>
</div>
