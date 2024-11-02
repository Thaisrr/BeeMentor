<script>
	import bee from '$lib/images/bee.svg';
</script>

<div class="container">
	<header class="width">
		<hgroup>
			<h1>
				<span class="bee">Bee</span> Mentor
			</h1>
			<p>Ta safe place pour mentorer et être mentorée !</p>
		</hgroup>

		<img src={bee} alt="BeeMentor, un dessin d'abeille" />
	</header>
</div>


<style>

	header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		font-size: 3rem;
		text-align: center;
	}

	h1 .bee {
		color: var(--main);
	}

	img {
		width: 40%
	}

	@media (width > 768px) {
		header {
			flex-direction: row;
		}
  }

		</style>