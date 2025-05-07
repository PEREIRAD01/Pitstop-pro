import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/config';

type Vehicle = {
	id: string;
	userId: string;
	brand: string;
	model: string;
	licensePlate: string;
	type: string;
	kilometers: number;
	year: number;
	image: string;
};

export const fetchUserVehicles = async (): Promise<Vehicle[]> => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	if (!currentUser) return [];

	const q = query(collection(db, 'vehicles'), where('userId', '==', currentUser.uid));

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		...(doc.data() as Omit<Vehicle, 'id'>),
	}));
};
