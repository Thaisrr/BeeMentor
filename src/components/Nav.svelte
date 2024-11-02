<script>
	import { page } from '$app/stores';

	const items = [
		{ href: '/', text: 'Home' },
		{ href: '/inscription', text: 'Inscription' },
		{ href: '/login', text: 'Login' },
		{ href: '/mentors', text: 'Mentors' },
		{ href: '/messages', text: 'Messages'},
	];
</script>

<nav>
	<ul class="width">
		{#each items as { href, text }}
			<li>
				<a {href} class:active={$page.url.pathname === href}>{text}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
			width: 100%;
			border-bottom: 1px solid #ccc;
	}

	ul {
			display: flex;
			justify-content: flex-end;
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