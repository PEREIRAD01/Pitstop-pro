import React, { useEffect, useState } from 'react';
import { fetchUserVehicles } from '../services/vehicles';
import { getAuth } from 'firebase/auth';

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

const Vehicles: React.FC = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	useEffect(() => {
		const loadVehicles = async () => {
			const auth = getAuth();
			const currentUser = auth.currentUser;

			console.log('User UID:', currentUser?.uid); 

			const data = await fetchUserVehicles();
			setVehicles(data);
		};

		loadVehicles();
	}, []);

	return (
		<div className='p-6 space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
				<div>
					<h1 className='text-3xl font-bold'>My Vehicles</h1>
					<p className='text-gray-500'>Manage your cars and motorcycles below.</p>
				</div>
				<button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition'>Add Vehicle</button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{vehicles.length === 0 ? (
					<div className='text-gray-500 text-center col-span-full'>No vehicles found.</div>
				) : (
					vehicles.map(vehicle => (
						<div key={vehicle.id} className='border p-4 rounded shadow-sm'>
							<h2 className='font-semibold text-lg'>
								{vehicle.brand} {vehicle.model}
							</h2>
							<p className='text-sm text-gray-500'>{vehicle.licensePlate}</p>
							<p className='text-sm text-gray-500'>{vehicle.kilometers} km</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Vehicles;

