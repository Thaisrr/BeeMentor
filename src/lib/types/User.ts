export type User = {
	id: string;
	email: string;
	username: string;
	photoUrl?: string;
	isMentor: boolean;
	skills: string[];
	description: string;
}