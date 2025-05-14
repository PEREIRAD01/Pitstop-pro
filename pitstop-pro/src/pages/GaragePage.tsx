import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserVehicles } from '../services/vehicles';
import GarageAddVehicleModal from '../components/modals/GarageAddVehicleModal';
import GarageVehicleCard from '../components/garage/GarageVehicleCard';
import { GarageVehicle } from '../types/garageVehicle';

const GaragePage: React.FC = () => {
	const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const loadVehicles = async () => {
			const auth = getAuth();
			const currentUser = auth.currentUser;

			if (!currentUser) return;

			const data = await fetchUserVehicles();
			setVehicles(data);
		};

		loadVehicles();
	}, []);

	return (
		<div className='p-6 space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
				<div>
					<h1 className='text-3xl font-bold'>My Garage</h1>
					<p className='text-gray-500'>Manage your cars and motorcycles below.</p>
				</div>
				<button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition' onClick={() => setShowModal(true)}>
					Add Vehicle
				</button>
			</div>

			<GarageAddVehicleModal isOpen={showModal} onClose={() => setShowModal(false)} />

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{vehicles.length === 0 ? <div className='text-gray-500 text-center col-span-full'>No vehicles found.</div> : vehicles.map(vehicle => <GarageVehicleCard key={vehicle.id} vehicle={vehicle} />)}
			</div>
		</div>
	);
};

export default GaragePage;
