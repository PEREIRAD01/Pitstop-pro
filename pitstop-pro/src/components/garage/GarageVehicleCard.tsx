import React, { useState } from 'react';
import { Trash } from 'phosphor-react';
import { GarageVehicle } from '../../types/garageVehicle';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GarageEventLine from './GarageEventLine';

type Props = {
	vehicle: GarageVehicle;
	onDelete: () => void;
	onEdit: (vehicle: GarageVehicle) => void;
};

const GarageVehicleCard: React.FC<Props> = ({ vehicle, onDelete, onEdit }) => {
	const [localVehicle, setLocalVehicle] = useState(vehicle);

	const handleDelete = async () => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${localVehicle.vehicleName || localVehicle.brand + ' ' + localVehicle.model}?`);
		if (!confirmDelete) return;

		try {
			await deleteDoc(doc(db, 'vehicles', localVehicle.id));
			onDelete();
		} catch (error) {
			console.error('Error deleting vehicle:', error);
		}
	};

	const toggleDone = async (field: keyof GarageVehicle) => {
		try {
			const ref = doc(db, 'vehicles', localVehicle.id);
			const newValue = !localVehicle[field];
			await updateDoc(ref, { [field]: newValue });
			setLocalVehicle({ ...localVehicle, [field]: newValue });
		} catch (err) {
			console.error('Failed to toggle field:', field, err);
		}
	};

	return (
		<div className='p-4 rounded-xl bg-surface border border-border flex flex-col justify-between shadow-sm'>
			<div className='flex items-start gap-4'>
				<div className='flex flex-col items-center w-28 shrink-0'>
					{localVehicle.image ? (
						<img src={localVehicle.image} alt='Vehicle' className='rounded-full w-28 h-28 object-cover border border-border' />
					) : (
						<div className='rounded-full w-28 h-28 bg-background flex items-center justify-center text-sm text-text-muted border border-dashed border-border'>No photo</div>
					)}
					<p className='text-xs text-text-muted mt-2'>{localVehicle.licensePlate}</p>
				</div>

				<div className='flex-1'>
					<h2 className='text-lg font-semibold text-text'>{localVehicle.vehicleName || `${localVehicle.brand} ${localVehicle.model}`}</h2>

					<div className='grid sm:grid-cols-[1fr_auto] grid-cols-1 gap-2 mt-4 items-center'>
						<span className='text-xs font-semibold text-text-muted sm:col-start-2'>Mark as done</span>

						<GarageEventLine label='Insurance' date={localVehicle.insuranceDate} done={localVehicle.insuranceDone} onMarkAsDone={() => toggleDone('insuranceDone')} />

						<GarageEventLine label='Inspection' date={localVehicle.inspectionDate} done={localVehicle.inspectionDone} onMarkAsDone={() => toggleDone('inspectionDone')} />

						<GarageEventLine label='Car Circulation Unified Tax' date={localVehicle.taxDate} done={localVehicle.taxDone} onMarkAsDone={() => toggleDone('taxDone')} />

						<GarageEventLine label='Scheduled vehicle service' date={localVehicle.maintenanceDate} done={localVehicle.maintenanceDone} onMarkAsDone={() => toggleDone('maintenanceDone')} />
					</div>
				</div>
			</div>

			<div className='mt-4 flex justify-end items-center'>
				<div className='flex gap-3'>
					<button
						onClick={e => {
							e.stopPropagation();
							onEdit(localVehicle);
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
