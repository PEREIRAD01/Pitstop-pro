import { Trash } from 'phosphor-react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { GarageVehicle } from '../../types/garageVehicle';
import GarageEventLine from './GarageEventLine';

type Props = {
	vehicle: GarageVehicle;
	onEdit: (vehicle: GarageVehicle) => void;
	onDelete?: () => void;
};

const GarageVehicleCard: React.FC<Props> = ({ vehicle, onEdit }) => {
	const handleDelete = async () => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${vehicle.vehicleName || vehicle.brand + ' ' + vehicle.model}?`);
		if (!confirmDelete) return;

		try {
			await deleteDoc(doc(db, 'vehicles', vehicle.id));
		} catch (error) {
			console.error('Error deleting vehicle:', error);
		}
	};

	const toggleDone = async (field: keyof GarageVehicle) => {
		try {
			const ref = doc(db, 'vehicles', vehicle.id);
			const newValue = !vehicle[field];
			await updateDoc(ref, { [field]: newValue });
		} catch (err) {
			console.error('Failed to toggle field:', field, err);
		}
	};

	return (
		<div className='p-4 rounded-xl bg-surface border border-border flex flex-col justify-between shadow-sm'>
			<div className='flex items-start gap-4'>
				<div className='flex flex-col items-center w-28 shrink-0'>
					{vehicle.image ? (
						<img src={vehicle.image} alt='Vehicle' className='rounded-full w-28 h-28 object-cover border border-border' />
					) : (
						<div className='rounded-full w-28 h-28 bg-background flex items-center justify-center text-sm text-text-muted border border-dashed border-border'>No photo</div>
					)}
					<p className='text-xs text-text-muted mt-2'>{vehicle.licensePlate}</p>
				</div>

				<div className='flex-1'>
					<h2 className='text-lg font-semibold text-text'>{vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`}</h2>

					<div className='grid sm:grid-cols-[1fr_auto] grid-cols-1 gap-2 mt-4 items-center'>
						<span className='text-xs font-semibold text-text-muted sm:col-start-2'>Mark as done</span>

						<GarageEventLine label='Insurance' date={vehicle.insuranceDate} done={vehicle.insuranceDone} onMarkAsDone={() => toggleDone('insuranceDone')} />
						<GarageEventLine label='Inspection' date={vehicle.inspectionDate} done={vehicle.inspectionDone} onMarkAsDone={() => toggleDone('inspectionDone')} />
						<GarageEventLine label='Car Circulation Unified Tax' date={vehicle.taxDate} done={vehicle.taxDone} onMarkAsDone={() => toggleDone('taxDone')} />
						<GarageEventLine label='Scheduled vehicle service' date={vehicle.maintenanceDate} done={vehicle.maintenanceDone} onMarkAsDone={() => toggleDone('maintenanceDone')} />
					</div>
				</div>
			</div>

			<div className='mt-4 flex justify-end items-center'>
				<div className='flex gap-3'>
					<button
						onClick={e => {
							e.stopPropagation();
							onEdit(vehicle);
						}}
						className='text-sm text-accent flex items-center gap-1 group'
					>
						<span className='text-xl leading-none'>＋</span>
						<span className='underline-offset-2 group-hover:underline'>More details</span>
					</button>

					<button onClick={handleDelete} className='text-sm text-destructive/70 hover:underline flex items-center gap-1'>
						<Trash size={16} /> Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default GarageVehicleCard;
