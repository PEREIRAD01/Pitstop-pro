import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/config';
import { GarageVehicle } from '../types/garageVehicle';

export function useUserVehicles() {
	const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
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
				...(doc.data() as Omit<GarageVehicle, 'id'>),
			}));

			setVehicles(data);
			setLoading(false);
		};

		fetchVehicles();
	}, []);

	return { vehicles, loading };
}
