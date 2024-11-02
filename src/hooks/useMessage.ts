import { authStore } from '../stores/authStore';
import { get, type Writable, writable } from 'svelte/store';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "$lib/firebase/firebase.client";
import { onMount } from 'svelte';
import type { Message } from '$lib/types/Message';

export const useMessage = (recipientId: string) => {
	const { currentUser } = get(authStore);
	const messages: Writable<Message[]> = writable([]);

	async function getMessagesBetweenUsers() {
		try {
			const messagesRef = collection(db, "messages");
			const messagesQuery = query(
				messagesRef,
				where("senderId", "in", [currentUser?.uid, recipientId]),
				where("recipientId", "in", [currentUser?.uid, recipientId]),
				orderBy("timestamp")
			);

			const querySnapshot = await getDocs(messagesQuery);
			const ms = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			console.log("Messages récupérés :", ms);
			return ms;
		} catch (error) {
			console.error("Erreur lors de la récupération des messages :", error);
			throw new Error("Erreur lors de la récupération des messages");
		}
	}

	onMount(async () => {
		messages.set(await getMessagesBetweenUsers() as Message[]);
	});

	return {
		messages
	};
}
