<script lang="ts">
	export let data: { users: {username: string, uid: string, notificationsCount: number}[] };
</script>

<main class="width">
	<h1>Mes messages</h1>

	<ul>
		{#each data.users as user}
			<li>
				<a href={`/contact/${user.uid}`}>{user.username}
					{#if user.notificationsCount > 0}
						<span class="notifs">{user.notificationsCount}</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	.notifs {
		background-color: var(--secondary);
		color: white;
		border-radius: 50%;
		padding: 5px 10px;
		margin-left: 1rem;
	}
</style>