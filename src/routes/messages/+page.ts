import type { PageLoad } from './$types';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';
import { getAuth } from 'firebase/auth';

export const load: PageLoad = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		throw new Error('User is not authenticated');
	}

	const userId = user.uid; // L'UID de l'utilisateur connecté
	const userIdsSet = new Set<string>(); // Ensemble pour stocker les IDs d'utilisateurs uniques

	try {
		// Requête pour récupérer les messages où l'utilisateur est le destinataire
		const messagesRef = collection(db, 'messages');
		const receivedMessagesQuery = query(
			messagesRef,
			where('recipientId', '==', userId)
		);
		const receivedMessagesSnapshot = await getDocs(receivedMessagesQuery);

		// Ajouter les senderId des messages reçus
		receivedMessagesSnapshot.forEach((doc) => {
			const messageData = doc.data();
			userIdsSet.add(messageData.senderId);
		});

		// Requête pour récupérer les messages où l'utilisateur est l'expéditeur
		const sentMessagesQuery = query(
			messagesRef,
			where('senderId', '==', userId)
		);
		const sentMessagesSnapshot = await getDocs(sentMessagesQuery);

		// Ajouter les recipientId des messages envoyés
		sentMessagesSnapshot.forEach((doc) => {
			const messageData = doc.data();
			userIdsSet.add(messageData.recipientId);
		});

		// Récupérer les usernames uniques à partir des IDs
		const usernamesWithUid: { username: string, uid: string }[] = [];
		for (const uid of userIdsSet) {
			const userDocRef = doc(db, 'users', uid);
			const userDocSnap = await getDoc(userDocRef);
			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				if (userData.username) {
					// Stocker le username avec l'UID
					usernamesWithUid.push({ username: userData.username, uid });
				}
			}
		}

		return {
			users: usernamesWithUid // Retourner la liste des objets { username, uid }
		};
	} catch (error) {
		console.error("Erreur lors de la récupération des utilisateurs :", error);
		throw new Error('Failed to fetch users');
	}
};
