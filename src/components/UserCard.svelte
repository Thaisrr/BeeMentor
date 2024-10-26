<script lang="ts">
	import type { User } from '$lib/types/User';
	
	const props: {user : User}  = $props();
</script>

<article class="card">
	<div class="header">
		<img alt="" src="https://www.leparisien.fr/resizer/65tlPV7WjjSVPpZcKvtzihcOdJs=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/VMCRV43ICVBTTNW7S6GXPDQYFI.jpg">
	</div>
	<div class="body">
		<h2>{props.user.username}</h2>
		<p>{props.user.description}</p>
	</div>

</article>