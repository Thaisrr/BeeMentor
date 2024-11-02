<script lang="ts">
	import type { User } from '$lib/types/User';

	const { user }: {user : User}  = $props();
</script>

<article class="card">
	<div class="header">
		<img alt="" src="https://www.leparisien.fr/resizer/65tlPV7WjjSVPpZcKvtzihcOdJs=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/VMCRV43ICVBTTNW7S6GXPDQYFI.jpg">
	</div>
	<div class="body">
		<h2>{user.username}</h2>
		<p>{user.description}</p>
		<p>
			<a href={`contact/${user.id}`}>La contacter</a>
		</p>
	</div>

</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--secondary);
		border-radius: 10px;
		margin: 1rem;
		overflow: hidden;
	}

	.header {
		height: 200px;
		overflow: hidden;
	}

	.header img {
		width: 100%;
	}

	.body {
		padding: 1rem;
	}

	p:last-child {
			margin: 20px auto;
	}
</style>