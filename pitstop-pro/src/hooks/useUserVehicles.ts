import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/config';

export type Vehicle = {
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

export function useUserVehicles() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVehicles = async () => {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) return;

			const q = query(collection(db, 'vehicles'), where('userId', '==', user.uid));

			const snapshot = await getDocs(q);
			const data = snapshot.docs.map(doc => ({
				id: doc.id,
				...(doc.data() as Omit<Vehicle, 'id'>),
			}));

			setVehicles(data);
			setLoading(false);
		};

		fetchVehicles();
	}, []);

	return { vehicles, loading };
}
