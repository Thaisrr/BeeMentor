import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

export const useNotifications = () => {
	const notificationsCount = writable(0);
	const auth = getAuth();

	const fetchNotificationsCount = async (userId: string) => {
		const notificationsRef = collection(db, 'notifications');
		const notificationsQuery = query(
			notificationsRef,
			where('recipientId', '==', userId)
		);
		const notificationsSnapshot = await getDocs(notificationsQuery);
		notificationsCount.set(notificationsSnapshot.size);
		console.log('Nombre de notifications :', notificationsSnapshot.size);
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			fetchNotificationsCount(user.uid);
		} else {
			notificationsCount.set(0);
		}
	});

	return {
		notificationsCount
	};
};
