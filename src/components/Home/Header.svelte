<script>
	import bee from '$lib/images/bee.svg';
	import Button from '../Button.svelte';
</script>

<div class="container">
	<header class="width">
		<hgroup>
			<h1>
				<span class="bee">Bee</span> Mentor
			</h1>
			<p>Ta safe place pour mentorer et être mentorée !</p>
			<p class="btn">
				<Button className="primary" type="button" onclick={() => window.location.href = '/inscription'}>Inscris-toi !</Button>
			</p>
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

	.btn {
			font-size: 1.3rem;
			margin: 50px 0;
	}

	h1 .bee {
		color: var(--main);
	}

	h1 {
			margin-top: 80px;
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