<script lang="ts">
	import type { User } from '$lib/types/User';
	import { useMessage } from '../../../hooks/useMessage';
	import { collection, addDoc } from "firebase/firestore";
	import { db } from "$lib/firebase/firebase";
	import { writable } from 'svelte/store';
	import type { Message } from '$lib/types/Message';
	import {authStore} from '../../../stores/authStore';
	import Button from '../../../components/Button.svelte';

	export let data: { user: User, userId: string};

	const { messages } = useMessage(data.userId);
	const messageContent = writable('');
	const { currentUser } = $authStore;

	const sendMessage = async () => {
		try {
			const senderId = currentUser?.uid;
			const recipientId = data.userId;

			// Référence à la collection `messages`
			const messagesRef = collection(db, "messages");

			const newMessage: Omit<Message, 'id'> = {
				senderId,
				recipientId,
				content: $messageContent,
				timestamp : new Date(),
			};

			await addDoc(messagesRef, newMessage);
			messageContent.set('');
			messages.set([...$messages, {...newMessage, id: ''}]);

			const notificationsRef = collection(db, "notifications");

			const newNotification = {
				recipientId,
				senderId,
				timestamp: new Date(),
			};

			await addDoc(notificationsRef, newNotification);
		} catch (error) {
			console.error("Erreur lors de l'envoi du message :", error);
			throw new Error("Impossible d'envoyer le message");
		}
	};
</script>

<section class="width">
	<h1>Tes messages avec {data.user.username}</h1>
	<div class="center">
		<p>{data.user.description}</p>
		{#if data.user.isMentor}
		<p class="skills">
			{#each data.user.skills as skill}
				<span>{skill}</span>
			{/each}
		</p>
		{/if}
	</div>

	{#if $messages.length === 0}
		<p class="center">Pas de messages pour le moment</p>
	{:else}
		{#each $messages as message}
			<article class:right={message.senderId === currentUser?.uid}>
				<p>{message.content}</p>
			</article>
		{/each}
	{/if}

	<form on:submit|preventDefault={sendMessage}>
		<textarea bind:value={$messageContent} placeholder="Écrivez votre message ici..."></textarea>
		<Button className="primary" type="submit">Envoyer</Button>
	</form>
</section>

<style>
    .center {
        text-align: center;
				margin-bottom: 50px;
    }

    .skills {
        display: flex;
        justify-content: center;
    }

    .skills span {
        margin: 0 0.5rem;
        background-color: var(--main);
        border-radius: 50px;
        padding: 5px 15px;
    }


		article {
			margin: 1rem 0;
			padding: 1rem;
			border-radius: 10px;
			background-color: var(--main);
			width: 60%;
		}

		article.right {
			background-color: var(--secondary);
				color: white;
				margin-left: auto;
		}

		textarea {
				width: 100%;
				height: 100px;
				margin: 1rem 0;
		}
</style>
