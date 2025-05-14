import React from 'react';
import { PencilSimple, Trash, Eye } from 'phosphor-react';
import { GarageVehicle } from '../../types/garageVehicle';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GarageEventLine from './GarageEventLine';

type Props = {
	vehicle: GarageVehicle;
	onDelete: () => void;
	onEdit: (vehicle: GarageVehicle) => void;
	onView?: (vehicle: GarageVehicle) => void;
};

const GarageVehicleCard: React.FC<Props> = ({ vehicle, onDelete, onEdit, onView }) => {
	const handleDelete = async () => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${vehicle.vehicleName || vehicle.brand + ' ' + vehicle.model}?`);
		if (!confirmDelete) return;

		try {
			await deleteDoc(doc(db, 'vehicles', vehicle.id));
			onDelete();
		} catch (error) {
			console.error('Error deleting vehicle:', error);
		}
	};

	const markAsDone = async (field: keyof GarageVehicle) => {
		try {
			const ref = doc(db, 'vehicles', vehicle.id);
			await updateDoc(ref, {
				[field]: true,
			});
			onEdit({ ...vehicle, [field]: true });
		} catch (err) {
			console.error('Failed to update field:', field, err);
		}
	};

	return (
		<div className='p-4 rounded-xl bg-surface border border-border flex flex-col justify-between shadow-sm'>
			<div className='flex items-start gap-4'>
				{/* Foto + Matrícula */}
				<div className='flex flex-col items-center w-24 shrink-0'>
					{vehicle.image ? (
						<img src={vehicle.image} alt='Vehicle' className='rounded-full w-20 h-20 object-cover border border-border' />
					) : (
						<div className='rounded-full w-20 h-20 bg-background flex items-center justify-center text-sm text-text-muted border border-dashed border-border'>No photo</div>
					)}
					<p className='text-xs text-text-muted mt-2'>{vehicle.licensePlate}</p>
				</div>

				{/* Info do veículo */}
				<div className='flex-1'>
					<h2 className='text-lg font-semibold text-text'>{vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`}</h2>
					<p className='text-sm font-medium mt-2'>This year:</p>
					<ul className='mt-1 space-y-1'>
						<GarageEventLine label='Insurance' date={vehicle.insuranceDate} done={vehicle.insuranceDone} onMarkAsDone={() => markAsDone('insuranceDone')} />
						<GarageEventLine label='Inspection' date={vehicle.inspectionDate} done={vehicle.inspectionDone} onMarkAsDone={() => markAsDone('inspectionDone')} />
						<GarageEventLine label='Car Circulation Unified Tax' date={vehicle.taxDate} done={vehicle.taxDone} onMarkAsDone={() => markAsDone('taxDone')} />
						<GarageEventLine label='Scheduled vehicle service' date={vehicle.maintenanceDate} done={vehicle.maintenanceDone} onMarkAsDone={() => markAsDone('maintenanceDone')} />
					</ul>
				</div>
			</div>

			{/* Ações */}
			<div className='mt-4 flex justify-between items-center'>
				<button onClick={() => onView?.(vehicle)} className='text-sm font-medium text-accent hover:underline flex items-center gap-1'>
					<Eye size={16} />
					See more
				</button>

				<div className='flex gap-4'>
					<button onClick={() => onEdit(vehicle)} title='Edit' aria-label='Edit vehicle' className='text-text-muted hover:text-accent transition-colors'>
						<PencilSimple size={20} />
					</button>
					<button onClick={handleDelete} title='Delete' aria-label='Delete vehicle' className='text-text-muted hover:text-red-500 transition-colors'>
						<Trash size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default GarageVehicleCard;
