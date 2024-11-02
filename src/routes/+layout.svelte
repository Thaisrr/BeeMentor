<script>
	import {onMount} from 'svelte';
	import { auth, initializeFirebase } from '$lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore';
	import '../app.css';
	import Nav from '../components/Nav.svelte';

	onMount(() => {
		initializeFirebase();
		auth.onAuthStateChanged(user => {
			authStore.update(store => {
				return {...store, currentUser: user, isLoading: false};
			});
		});
	});

</script>

<Nav />

<slot />