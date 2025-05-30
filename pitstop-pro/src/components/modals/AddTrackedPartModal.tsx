import { useEffect, useState } from 'react';
import { TrackedPart } from '../../types/maintenance';
import { useUserVehicles } from '../../hooks/useUserVehicles';
import { getAuth } from 'firebase/auth';

type Props = {
	isOpen: boolean;
	mode: 'add' | 'edit';
	defaultValues?: TrackedPart | null;
	onClose: () => void;
	onAdd: (newPart: Omit<TrackedPart, 'id'>) => void;
	onEdit: (updatedPart: TrackedPart) => void;
};

function AddTrackedPartModal({ isOpen, mode, defaultValues, onClose, onAdd, onEdit }: Props) {
	const { vehicles } = useUserVehicles();

	const [formData, setFormData] = useState({
		vehicleId: '',
		partName: '',
		installDate: '',
		installKilometers: 0,
		validForMonths: '',
		validForKm: '',
		notes: '',
	});

	useEffect(() => {
		if (mode === 'edit' && defaultValues) {
			setFormData({
				vehicleId: defaultValues.vehicleId,
				partName: defaultValues.partName,
				installDate: defaultValues.installDate,
				installKilometers: defaultValues.installKilometers,
				validForMonths: defaultValues.validForMonths?.toString() || '',
				validForKm: defaultValues.validForKm?.toString() || '',
				notes: defaultValues.notes || '',
			});
		} else {
			setFormData({
				vehicleId: '',
				partName: '',
				installDate: new Date().toISOString().split('T')[0],
				installKilometers: 0,
				validForMonths: '',
				validForKm: '',
				notes: '',
			});
		}
	}, [mode, defaultValues]);

	if (!isOpen) return null;

	const handleChange = (field: string, value: string | number) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		const vehicle = vehicles.find(v => v.id === formData.vehicleId);
		if (!vehicle) return;

		const baseData = {
			vehicleId: formData.vehicleId,
			vehicleName: vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`,
			partName: formData.partName,
			installDate: formData.installDate,
			installKilometers: formData.installKilometers,
			validForMonths: formData.validForMonths ? Number(formData.validForMonths) : undefined,
			validForKm: formData.validForKm ? Number(formData.validForKm) : undefined,
			notes: formData.notes || '',
			userId: user.uid,
		};

		if (mode === 'edit' && defaultValues?.id) {
			onEdit({ ...baseData, id: defaultValues.id });
		} else {
			onAdd(baseData);
		}

		onClose();
	};

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[999]'>
			<div className='bg-surface p-6 rounded-lg w-full max-w-lg shadow-xl border border-border'>
				<h2 className='text-xl font-semibold mb-4'>{mode === 'edit' ? 'Edit Part' : 'Add New Part'}</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium mb-1'>Vehicle</label>
						<select
							value={formData.vehicleId}
							onChange={e => handleChange('vehicleId', e.target.value)}
							className='w-full p-2 rounded-md bg-input text-text border border-border'
							required
							disabled={mode === 'edit'}
						>
							<option value=''>Select a vehicle</option>
							{vehicles.map(v => (
								<option key={v.id} value={v.id}>
									{v.vehicleName || `${v.brand} ${v.model}`}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>Part name</label>
						<input type='text' value={formData.partName} onChange={e => handleChange('partName', e.target.value)} className='w-full p-2 rounded-md bg-input text-text border border-border' required />
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium mb-1'>Install date</label>
							<input
								type='date'
								value={formData.installDate}
								onChange={e => handleChange('installDate', e.target.value)}
								className='w-full p-2 rounded-md bg-input text-text border border-border'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Install km</label>
							<input
								type='number'
								value={formData.installKilometers}
								onChange={e => handleChange('installKilometers', Number(e.target.value))}
								className='w-full p-2 rounded-md bg-input text-text border border-border'
								required
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium mb-1'>Valid for (months)</label>
							<input
								type='number'
								value={formData.validForMonths}
								onChange={e => handleChange('validForMonths', e.target.value)}
								className='w-full p-2 rounded-md bg-input text-text border border-border'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-1'>Valid for (km)</label>
							<input type='number' value={formData.validForKm} onChange={e => handleChange('validForKm', e.target.value)} className='w-full p-2 rounded-md bg-input text-text border border-border' />
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium mb-1'>Notes</label>
						<textarea value={formData.notes} onChange={e => handleChange('notes', e.target.value)} className='w-full p-2 rounded-md bg-input text-text border border-border' rows={2} />
					</div>

					<div className='flex justify-end gap-4 pt-4'>
						<button type='button' onClick={onClose} className='px-4 py-2 rounded bg-muted text-sm hover:bg-muted/70 transition'>
							Cancel
						</button>
						<button type='submit' className='px-4 py-2 rounded bg-primary text-white text-sm hover:bg-accent transition'>
							{mode === 'edit' ? 'Save Changes' : 'Add Part'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddTrackedPartModal;
