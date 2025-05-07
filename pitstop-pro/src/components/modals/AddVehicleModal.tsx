import React from 'react';
import AddVehicleForm from '../AddVehicleForm';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const AddVehicleModal: React.FC<Props> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg relative max-w-lg w-full'>
				<button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'>
					×
				</button>
				<AddVehicleForm />
			</div>
		</div>
	);
};

export default AddVehicleModal;
