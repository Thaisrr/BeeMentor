import { authStore } from '../stores/authStore';
import { get, type Writable, writable } from 'svelte/store';
import { collection, query, where, getDocs, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "$lib/firebase/firebase";
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

	async function deleteNotifications() {
		try {
			const notificationsRef = collection(db, "notifications");
			const notificationsQuery = query(
				notificationsRef,
				where("senderId", "==", recipientId),
				where("recipientId", "==", currentUser?.uid)
			);

			const querySnapshot = await getDocs(notificationsQuery);
			const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
			await Promise.all(deletePromises);
			console.log("Notifications supprimées avec succès.");
		} catch (error) {
			console.error("Erreur lors de la suppression des notifications :", error);
		}
	}

	onMount(async () => {
		messages.set(await getMessagesBetweenUsers() as Message[]);
		deleteNotifications();
	});

	return {
		messages
	};
}
