<script lang="ts">
	export let data: { users: {username: string, uid: string}[] };
</script>

<main class="width">
	<h1>Mes messages</h1>

	<ul>
		{#each data.users as user}
			<li>
				<a href={`/contact/${user.uid}`}>{user.username}</a>
			</li>
		{/each}
	</ul>
</main>s