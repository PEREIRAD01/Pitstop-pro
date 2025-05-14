import React from 'react';
import { motion } from 'framer-motion';
import { Trash, PencilSimple } from 'phosphor-react';
import { GarageVehicle } from '../../types/garageVehicle';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

type Props = {
	vehicle: GarageVehicle;
	onDelete: () => void;
	onEdit: (vehicle: GarageVehicle) => void;
};

const GarageVehicleCard: React.FC<Props> = ({ vehicle, onDelete, onEdit }) => {
	const handleDelete = async () => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${vehicle.brand} ${vehicle.model}?`);
		if (!confirmDelete) return;

		try {
			await deleteDoc(doc(db, 'vehicles', vehicle.id));
			onDelete();
		} catch (error) {
			console.error('Error deleting vehicle:', error);
		}
	};

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className='border p-4 rounded shadow-sm bg-surface relative'>
			<h2 className='font-semibold text-lg'>
				{vehicle.brand} {vehicle.model}
			</h2>
			<p className='text-sm text-gray-500'>{vehicle.licensePlate}</p>
			<p className='text-sm text-gray-500'>{vehicle.kilometers} km</p>

			<button
				onClick={() => onEdit(vehicle)}
				aria-label={`Edit ${vehicle.brand} ${vehicle.model}`}
				title={`Edit ${vehicle.brand} ${vehicle.model}`}
				className='absolute top-2 right-9 text-gray-400 hover:text-blue-500 transition-colors'
			>
				<PencilSimple size={20} weight='light' />
			</button>

			<button
				onClick={handleDelete}
				aria-label={`Delete ${vehicle.brand} ${vehicle.model}`}
				title={`Delete ${vehicle.brand} ${vehicle.model}`}
				className='absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors'
			>
				<Trash size={20} weight='light' />
			</button>
		</motion.div>
	);
};

export default GarageVehicleCard;
