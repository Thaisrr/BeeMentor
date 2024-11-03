<script>
	import { page } from '$app/stores';
	import { useNotifications } from '../hooks/useNotifications';
	import { authHandlers, authStore } from '../stores/authStore';
	import Button from './Button.svelte';

	const { notificationsCount } = useNotifications();

	const items = [
		{ href: '/', text: 'Accueil' },
	];

	const loggedOutItems = [
		{ href: '/inscription', text: 'Inscription' },
		{ href: '/login', text: 'Connexion' },
	]

	const loggedItems = [
		{ href: '/mentors', text: 'Mentors' },
		{ href: '/messages', text: 'Messages' },
	];
</script>

<nav>
	<ul class="width">
		{#each items as { href, text }}
			<li>
				<a {href} class:active={$page.url.pathname === href}>{text}</a>
			</li>
		{/each}
		{#if $authStore.currentUser}
			{#each loggedItems as { href, text }}
				<li>
					<a {href} class:active={$page.url.pathname === href}>
						{text}
						{#if href === '/messages'} ({$notificationsCount}){/if}
					</a>
				</li>
			{/each}
			<li>
				<Button onclick={() => authHandlers.logout()} type="button" className="tertiary">Déconnexion</Button>
			</li>
		{:else}
			{#each loggedOutItems as { href, text }}
				<li>
					<a {href} class:active={$page.url.pathname === href}>{text}</a>
				</li>
			{/each}
		{/if}
	</ul>
</nav>

<style>
    nav {
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 10;
    }

    ul {
        display: flex;
        justify-content: flex-end;
				align-items: center;
        padding: 2rem 0;
        gap: 2rem;
        list-style: none;
    }

    a:link, a:visited {
        color: var(--dark);
        text-decoration: none;
    }

    a:hover, a:active, a.active {
        color: var(--secondary);
    }
</style>
