<script lang="ts">

	import { authHandlers, authStore } from '../../stores/authStore';
	import Button from '../../components/Button.svelte';

	let user = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		mentor: false,
		description: '',
		skills: ['']
	};

	const signup = async (e: Event) => {
		e.preventDefault();
		try {
			await authHandlers.signup({
				username: user.username,
				email: user.email,
				password: user.password,
				isMentor: user.mentor,
				description: user.description,
				skills: user.skills
			})
			if($authStore.currentUser) {
				window.location.href = '/';
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<h1>Inscription</h1>

<form onsubmit={signup}>
	<div>
		<label for="username">Nom d'utilisatrice</label>
		<input id="username" type="text" bind:value={user.username} >
	</div>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={user.email} >
	</div>
	<div>
		<label for="password">Mot de passe</label>
		<input id="password" type="password" bind:value={user.password} >
	</div>
	<div>
		<label for="confirmPassword">Confirme ton mot de passe</label>
		<input id="confirmPassword" type="password" bind:value={user.confirmPassword} >
	</div>
	<div>
		<label for="mentor">Tu veux être mentor ?</label>
		<input id="mentor" type="checkbox" bind:checked={user.mentor} >
	</div>
		<div>
			<label for="mentorDescription">{user.mentor ? 'Que peux-tu apporter à tes protégées ?' : "Qu'attends-tu de ta mentor ?"}</label>
			<textarea id="mentorDescription" bind:value={user.description} ></textarea>
		</div>
	{#if user.mentor}
			<fieldset>
				<legend>Tes compétences</legend>
				{#each user.skills as skill, i}
					<div>
						<label for="skill{i}">Compétence {i + 1}</label>
						<input id="skill{i}" type="text" bind:value={skill} >
						<Button className="tertiary" type="button" onclick={() => user.skills = user.skills.filter((_, index) => index !== i)}>Supprimer</Button>
					</div>
				{/each}
				<Button className="secondary" type="button" onclick={() => user.skills = [...user.skills, '']}>Ajouter une compétence</Button>
				</fieldset>
	{/if}

	<Button className="primary" type="submit">Inscription</Button>
	<p class="center">Déjà un compte ? <a href="/login">Connectes-toi !</a> </p>
</form>

<style>
	.center {
			margin-top: 1rem;
	}
</style>