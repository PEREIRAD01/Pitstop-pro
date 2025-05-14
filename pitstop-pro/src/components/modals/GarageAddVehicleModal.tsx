import React from 'react';
import GarageVehicleForm from '../forms/GarageVehicleForm';
import GarageBaseVehicleModal from './GarageBaseVehicleModal';
import { Plus } from 'phosphor-react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const GarageAddVehicleModal: React.FC<Props> = ({ isOpen, onClose }) => {
	return (
		<GarageBaseVehicleModal isOpen={isOpen} onClose={onClose} title='Add Vehicle' icon={<Plus size={24} className='text-primary' />}>
			<GarageVehicleForm mode='add' onSuccess={onClose} />
		</GarageBaseVehicleModal>
	);
};

export default GarageAddVehicleModal;
