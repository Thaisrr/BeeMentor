import type { PageLoad } from './$types';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import { getAuth } from 'firebase/auth';

export const load: PageLoad = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		throw new Error('User is not authenticated');
	}

	const userId = user.uid;
	const userIdsSet = new Set<string>();

	try {
		const messagesRef = collection(db, 'messages');
		const receivedMessagesQuery = query(
			messagesRef,
			where('recipientId', '==', userId)
		);
		const receivedMessagesSnapshot = await getDocs(receivedMessagesQuery);

		receivedMessagesSnapshot.forEach((doc) => {
			const messageData = doc.data();
			userIdsSet.add(messageData.senderId);
		});

		const sentMessagesQuery = query(
			messagesRef,
			where('senderId', '==', userId)
		);
		const sentMessagesSnapshot = await getDocs(sentMessagesQuery);

		sentMessagesSnapshot.forEach((doc) => {
			const messageData = doc.data();
			userIdsSet.add(messageData.recipientId);
		});

		const usernamesWithNotificationsCount: { username: string, uid: string, notificationsCount: number }[] = [];
		for (const uid of userIdsSet) {
			const userDocRef = doc(db, 'users', uid);
			const userDocSnap = await getDoc(userDocRef);
			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				if (userData.username) {
					// Compter les notifications pour chaque utilisateur
					const notificationsRef = collection(db, 'notifications');
					const notificationsQuery = query(
						notificationsRef,
						where('recipientId', '==', userId),
						where('senderId', '==', uid)
					);
					const notificationsSnapshot = await getDocs(notificationsQuery);

					const notificationsCount = notificationsSnapshot.size; // Compte le nombre de notifications

					usernamesWithNotificationsCount.push({
						username: userData.username,
						uid,
						notificationsCount
					});
				}
			}
		}

		return {
			users: usernamesWithNotificationsCount
		};
	} catch (error) {
		console.error("Erreur lors de la récupération des utilisateurs et des notifications :", error);
		throw new Error('Failed to fetch users and notifications');
	}
};
