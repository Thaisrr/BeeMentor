<script lang="ts">
	import {onMount} from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { authStore } from '../stores/authStore';
	import '../app.css';
	import Nav from '../components/Nav.svelte';

	onMount(() => {
		auth.onAuthStateChanged(user => {
			authStore.update(store => {
				return {...store, currentUser: user, isLoading: false};
			});
		});
	});

</script>

<Nav />

<slot />