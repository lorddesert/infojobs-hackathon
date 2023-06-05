<script>

	import { AppBar } from "@skeletonlabs/skeleton";
	import Logo from "./Logo.svelte";
	import OfferSearchBar from "./OfferSearchBar.svelte";

</script>
<header>
	<AppBar>
		<div class="flex gap-6">
			<Logo />
			<!-- <OfferSearchBar getOffers={getOffers}/> -->
			<OfferSearchBar />
		</div>
	</AppBar>
</header>
