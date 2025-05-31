import GarageVehicleForm from '../forms/GarageVehicleForm';
import GarageBaseVehicleModal from './GarageBaseVehicleModal';
import { GarageVehicle } from '../../types/garageVehicle';
import { PencilSimple } from 'phosphor-react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	vehicle: GarageVehicle;
	onSuccess?: () => void;
};

const GarageEditVehicleModal: React.FC<Props> = ({ isOpen, onClose, vehicle, onSuccess }) => {
	return (
		<GarageBaseVehicleModal isOpen={isOpen} onClose={onClose} title='Edit Vehicle' icon={<PencilSimple size={24} className='text-primary' />}>
			<GarageVehicleForm mode='edit' defaultValues={vehicle} onSuccess={onSuccess} />
		</GarageBaseVehicleModal>
	);
};

export default GarageEditVehicleModal;
