<script lang="ts">
	import { authHandlers, authStore } from '../../stores/authStore';

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

<form onsubmit={login}>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={user.email} >
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" bind:value={user.password} >
	</div>
	<button type="submit">Se connecter</button>
</form>