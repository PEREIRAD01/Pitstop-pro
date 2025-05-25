import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserVehicles } from '../../services/vehicles';
import VehicleCard from './VehicleCard';
import { GarageVehicle } from '../../types/garageVehicle';
import { useNavigate } from 'react-router-dom';

function MyVehicles() {
	const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadVehicles = async () => {
			const auth = getAuth();
			const currentUser = auth.currentUser;

			if (!currentUser) return;

			const data = await fetchUserVehicles();
			setVehicles(data);
			setLoading(false);
		};

		loadVehicles();
	}, []);

	if (loading) {
		return (
			<section>
				<h2 className='text-xl font-semibold mb-4'>My Vehicles</h2>
				<p className='text-muted-foreground'>Loading vehicles...</p>
			</section>
		);
	}

	if (vehicles.length === 0) {
		return (
			<section>
				<h2 className='text-xl font-semibold mb-4'>My Vehicles</h2>
				<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground space-y-4'>
					<p>No vehicles registered yet.</p>
					<button onClick={() => navigate('/vehicles')} className='px-6 py-3 bg-primary text-background rounded-md font-medium hover:bg-opacity-90 transition'>
						Add Your First Vehicle
					</button>
				</div>
			</section>
		);
	}

	return (
		<section>
			<h2 className='text-xl font-semibold mb-4'>My Vehicles</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{vehicles.map(vehicle => (
					<VehicleCard key={vehicle.id} vehicle={vehicle} />
				))}
			</div>
		</section>
	);
}

export default MyVehicles;
