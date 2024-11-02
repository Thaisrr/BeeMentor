import {writable} from 'svelte/store';
import {
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	//updateEmail,
	//updatePassword
} from 'firebase/auth';
import { auth, db } from '$lib/firebase/firebase.client';
import {doc, setDoc} from 'firebase/firestore';

type User = {
	email: string;
	username?: string | null;
	photoURL?: string | null;
	uid?: string | null;
	isMentor?: boolean | null;
	description?: string | null;
	skills?: string[] | null;
};
export const authStore = writable<{ isLoading: boolean,  currentUser: null | User}>({
	isLoading: true,
	currentUser: null,
});

export const authHandlers = {
	signup: async ({email, password, isMentor, description, skills, username}: User & {password: string}) => {
		const {user} = await createUserWithEmailAndPassword(auth, email, password);
		await setDoc(doc(db, 'users', user.uid), {
			isMentor,
			description,
			skills,
			username,
			id: user.uid,
		});
	},
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	},
/*	updateEmail: async (email: string) => {
		await updateEmail(auth, email);
	},
	updatePassword: async (password: string) => {
		await updatePassword(auth, password)
	}*/
}