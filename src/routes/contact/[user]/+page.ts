import type {PageLoad} from './$types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';

export const load: PageLoad = async ({params}) => {
	const userId = params.user;

	try {
		const userDocRef = doc(db, 'users', userId);
		const userDocSnap = await getDoc(userDocRef);

		if (!userDocSnap.exists()) {
			throw new Error('User not found');
		}

		const userData = userDocSnap.data();
		console.log('userData:', userData);


		return {
			user: userData,
			userId: userId
		};
	} catch (error) {
		console.error("Erreur lors de la récupération de l'utilisateur :", error);
		throw new Error('Failed to fetch user data');
	}

};