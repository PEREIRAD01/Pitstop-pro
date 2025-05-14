import React from 'react';
import GarageAddVehicleForm from '../GarageAddVehicleForm';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const GarageAddVehicleModal: React.FC<Props> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative max-w-lg w-full'>
				<button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'>
					×
				</button>
				<GarageAddVehicleForm onSuccess={onClose} />
			</div>
		</div>
	);
};

export default GarageAddVehicleModal;
