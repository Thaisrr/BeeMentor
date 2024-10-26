<script>
	import { useMentors } from '../../hooks/useMentor';
	import UserCard from '../../components/UserCard.svelte';

	const mentors = useMentors();

</script>

<h1>Mentors</h1>

{#each $mentors as mentor}
	<UserCard user={mentor} />
{/each}