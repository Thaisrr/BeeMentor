<script>
	import { useMentors } from '../../hooks/useMentor';
	import UserCard from '../../components/UserCard.svelte';

	const mentors = useMentors();

</script>

<main class="width">
	<h1>Trouve ta mentor !</h1>

	<div class="grid">
		{#each $mentors as mentor}
			<UserCard user={mentor} />
		{/each}
	</div>
</main>

<style>

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}
</style>