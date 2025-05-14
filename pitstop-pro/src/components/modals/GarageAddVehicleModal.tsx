import React from 'react';
import GarageVehicleForm from '../forms/GarageVehicleForm';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const GarageAddVehicleModal: React.FC<Props> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative max-w-lg w-full'>
				<button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl' aria-label='Close add vehicle modal' title='Close'>
					×
				</button>
				<h2 className='text-xl font-bold mb-4 text-center'>Add Vehicle</h2>
				<GarageVehicleForm mode='add' onSuccess={onClose} />
			</div>
		</div>
	);
};

export default GarageAddVehicleModal;
