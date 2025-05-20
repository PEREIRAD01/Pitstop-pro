import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/config';
import { GarageVehicle } from '../types/garageVehicle';

export const fetchUserVehicles = async (): Promise<GarageVehicle[]> => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	if (!currentUser) return [];

	const q = query(collection(db, 'vehicles'), where('userId', '==', currentUser.uid));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		...(doc.data() as Omit<GarageVehicle, 'id'>),
	}));
};
