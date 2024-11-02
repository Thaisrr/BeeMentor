<script>
	import women from '$lib/images/women.jpg';
</script>

<div class="container">
	<section class="width">
		<img src={women} alt="Des femmes travaillant ensemble.">
		<article>
			<h2>A propos de BeeMentor</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam aspernatur atque consequuntur corporis dolor, eius expedita labore laboriosam magnam molestiae non pariatur sint. Et in nostrum omnis quo saepe?</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam aspernatur atque consequuntur corporis dolor, eius expedita labore laboriosam magnam molestiae non pariatur sint. Et in nostrum omnis quo saepe?</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam aspernatur atque consequuntur corporis dolor, eius expedita labore laboriosam magnam molestiae non pariatur sint. Et in nostrum omnis quo saepe?</p>
		</article>
	</section>
</div>


<style>

	.container {
			background-color: var(--main);
			padding: 3rem 0;
			margin: 100px auto;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		width: 100%;
	}

	article {
		width: 80%;
	}

	h2 {
		font-size: 2rem;
	}

	p {
		margin: 1rem 0;
	}

	@media (width > 768px) {
		section {
			flex-direction: row;
			justify-content: space-between;
		}

		article {
			width: 50%;
		}

		img {
			width: 40%;
		}
	}
</style>