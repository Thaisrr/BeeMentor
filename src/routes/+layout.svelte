<script>
	import {onMount} from 'svelte';
	import { auth, initializeFirebase } from '$lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';

	onMount(() => {
		initializeFirebase();
		auth.onAuthStateChanged(user => {
			authStore.update(store => {
				return {...store, currentUser: user, isLoading: false};
			});
		});
	});

</script>

<nav>
	<ul>
		<li>
			<a href="/inscription">Inscription</a>
		</li>
		<li>
			<a href="/login">Login</a>
		</li>
		<li>
			<a href="/mentors">Mentors</a>
		</li>
	</ul>
</nav>

<slot />