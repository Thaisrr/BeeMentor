<script lang="ts">
	import { authHandlers, authStore } from '../../stores/authStore';
	import Button from '../../components/Button.svelte';

	let user = {
		email: '',
		password: ''
	};

	const login = async (e: Event) => {
		e.preventDefault();
		console.log(user);
		try {
			await authHandlers.login(user.email, user.password)
			if($authStore.currentUser) {
				window.location.href = '/';
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<h1>Se Connecter</h1>
<form onsubmit={login}>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={user.email} >
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" bind:value={user.password} >
	</div>
	<Button type="submit" className="primary">Se connecter</Button>
	<p class="center">Pas encore de compte ? <a href="/inscription">Inscris toi !</a> </p>
</form>

<style>
    .center {
        margin-top: 1rem;
    }
</style>
