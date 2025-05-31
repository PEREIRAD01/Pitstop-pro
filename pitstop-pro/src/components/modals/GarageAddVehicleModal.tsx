import React from 'react';
import GarageVehicleForm from '../forms/GarageVehicleForm';
import GarageBaseVehicleModal from './GarageBaseVehicleModal';
import { Plus } from 'phosphor-react';
import { GarageVehicle } from '../../types/garageVehicle';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (created: GarageVehicle) => void;
};

const GarageAddVehicleModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
	return (
		<GarageBaseVehicleModal isOpen={isOpen} onClose={onClose} title='Add Vehicle' icon={<Plus size={24} className='text-primary' />}>
			<GarageVehicleForm mode='create' onSuccess={onSuccess} />
		</GarageBaseVehicleModal>
	);
};

export default GarageAddVehicleModal;
