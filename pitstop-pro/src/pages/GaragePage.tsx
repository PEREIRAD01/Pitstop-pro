import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserVehicles } from '../services/vehicles';
import GarageAddVehicleModal from '../components/modals/GarageAddVehicleModal';
import GarageEditVehicleModal from '../components/modals/GarageEditVehicleModal';
import GarageVehicleCard from '../components/garage/GarageVehicleCard';
import { GarageVehicle } from '../types/garageVehicle';
import carIllustration from '../assets/car-illustration.png';

const GaragePage: React.FC = () => {
	const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedVehicle, setSelectedVehicle] = useState<GarageVehicle | null>(null);

	const loadVehicles = async () => {
		const auth = getAuth();
		const currentUser = auth.currentUser;
		if (!currentUser) return;
		const data = await fetchUserVehicles();
		setVehicles(data);
	};

	useEffect(() => {
		loadVehicles();
	}, []);

	const handleVehicleCreated = (created: GarageVehicle) => {
		setVehicles(prev => [...prev, created]);
	};

	return (
		<div className='p-6 space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
				<div>
					<h1 className='text-3xl font-bold'>My Garage</h1>
					<p className='text-gray-500'>Manage your cars and motorcycles below.</p>
				</div>
				<button onClick={() => setShowModal(true)} className='bg-accent/90 hover:bg-accent text-white font-medium px-4 py-2 rounded transition'>
					Add Vehicle
				</button>
			</div>

			<GarageAddVehicleModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSuccess={created => {
					handleVehicleCreated(created);
					setShowModal(false);
				}}
			/>

			{showEditModal && selectedVehicle && (
				<GarageEditVehicleModal
					isOpen={showEditModal}
					onClose={() => {
						setShowEditModal(false);
						setSelectedVehicle(null);
					}}
					onSuccess={updatedVehicle => {
						setVehicles(prev => prev.map(v => (v.id === updatedVehicle.id ? updatedVehicle : v)));
						setShowEditModal(false);
						setSelectedVehicle(null);
					}}
					vehicle={selectedVehicle}
				/>
			)}

			{vehicles.length === 0 ? (
				<div className='flex flex-col items-center justify-center text-center text-text-muted py-20 gap-6'>
					<img src={carIllustration} alt='No vehicles' className='w-40 h-auto opacity-70' />
					<div>
						<p className='text-lg font-medium'>You haven't added any vehicles yet.</p>
						<p className='text-sm'>Click the button above to start your garage.</p>
					</div>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{vehicles.map(vehicle => (
						<GarageVehicleCard
							key={vehicle.id}
							vehicle={vehicle}
							onDelete={loadVehicles}
							onEdit={v => {
								setSelectedVehicle(v);
								setShowEditModal(true);
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default GaragePage;
