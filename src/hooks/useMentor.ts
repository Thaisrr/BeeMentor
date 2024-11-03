// useMentors.ts
import { writable, type Writable } from "svelte/store";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { User as Mentor } from "$lib/types/User";
import { db } from '$lib/firebase/firebase';
import { onMount } from 'svelte';

export function useMentors(): Writable<Mentor[]> {
	const mentors: Writable<Mentor[]> = writable([]);

	async function fetchMentors() {
		const q = query(collection(db, "users"), where("isMentor", "==", true));

		try {
			const querySnapshot = await getDocs(q);
			const mentorList: Mentor[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Mentor));
			mentors.set(mentorList);
		} catch (error) {
			console.error("Erreur lors de la récupération des mentors :", error);
			mentors.set([]);
		}
	}

	onMount(() => {
		console.log('Fetching mentors');
		fetchMentors();
	});

	return mentors;
}
