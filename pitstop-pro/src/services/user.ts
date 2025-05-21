import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const saveUserProfile = async (
	uid: string,
	profileData: {
		displayName?: string;
		photoUrl?: string;
		phone?: string;
		address?: string;
	},
) => {
	const ref = doc(db, 'users', uid);
	await setDoc(ref, profileData, { merge: true });
};
