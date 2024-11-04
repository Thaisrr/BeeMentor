import { collection, query, where, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';

export const useNotifications = () => {
	const notificationsCount: Writable<number> = writable(0);
	const auth = getAuth();

	let unsubscribeFromNotifications: Unsubscribe | null = null;

	const subscribeToNotifications = (userId: string) => {
		const notificationsRef = collection(db, 'notifications');
		const notificationsQuery = query(
			notificationsRef,
			where('recipientId', '==', userId)
		);

		unsubscribeFromNotifications = onSnapshot(
			notificationsQuery,
			(snapshot) => {
				notificationsCount.set(snapshot.size);
				console.log('Nombre de notifications en direct :', snapshot.size);
			},
			(error) => {
				console.error("Erreur lors de la surveillance des notifications :", error);
			}
		);
	};

	onAuthStateChanged(auth, (user: User | null) => {
		if (unsubscribeFromNotifications) {
			unsubscribeFromNotifications();
			unsubscribeFromNotifications = null;
		}

		if (user) {
			subscribeToNotifications(user.uid);
		} else {
			notificationsCount.set(0);
		}
	});

	return {
		notificationsCount
	};
};
