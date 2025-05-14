import React, { useEffect, useState } from 'react';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/config';
import { GarageVehicle } from '../../types/garageVehicle';

type Props = {
	mode: 'add' | 'edit';
	defaultValues?: GarageVehicle | null;
	onSuccess?: () => void;
};

const GarageVehicleForm: React.FC<Props> = ({ mode, defaultValues, onSuccess }) => {
	const [formData, setFormData] = useState({
		vehicleName: '',
		brand: '',
		model: '',
		licensePlate: '',
		type: '',
		photoUrl: '',
		kilometers: 0,
		year: new Date().getFullYear(),
		insuranceDate: '',
		inspectionDate: '',
		taxDate: '',
		maintenanceDate: '',
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (mode === 'edit' && defaultValues) {
			setFormData({
				vehicleName: defaultValues.vehicleName || '',
				brand: defaultValues.brand,
				model: defaultValues.model,
				licensePlate: defaultValues.licensePlate,
				type: defaultValues.type,
				photoUrl: defaultValues.image || '',
				kilometers: defaultValues.kilometers,
				year: defaultValues.year,
				insuranceDate: defaultValues.insuranceDate || '',
				inspectionDate: defaultValues.inspectionDate || '',
				taxDate: defaultValues.taxDate || '',
				maintenanceDate: defaultValues.maintenanceDate || '',
			});
		}
	}, [mode, defaultValues]);

	const handleChange = (field: string, value: string | number) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const inputClass = 'w-full p-2 rounded-md bg-input text-text border border-border focus:outline-none focus:ring-2 focus:ring-accent';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) {
			setError('User not authenticated.');
			setLoading(false);
			return;
		}

		const dataToSave = {
			...formData,
			image: formData.photoUrl,
			userId: user.uid,
		};

		try {
			if (mode === 'edit' && defaultValues?.id) {
				await updateDoc(doc(db, 'vehicles', defaultValues.id), dataToSave);
			} else {
				await addDoc(collection(db, 'vehicles'), dataToSave);
			}
			setSuccess(true);
			if (onSuccess) onSuccess();
		} catch (err) {
			console.error(err);
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Coluna da imagem e campos relacionados */}
				<div className='flex flex-col items-center w-full'>
					{formData.photoUrl ? (
						<img src={formData.photoUrl} alt='Vehicle' className='rounded-xl w-full max-w-sm object-cover border border-border' />
					) : (
						<div className='w-full max-w-sm aspect-[4/3] bg-surface text-text-muted flex items-center justify-center rounded-xl border border-dashed border-border'>No photo</div>
					)}

					<div className='mt-4 w-full space-y-4'>
						<div>
							<label className='block text-sm font-medium text-text-muted mb-1'>Photo URL</label>
							<input type='url' className={inputClass} value={formData.photoUrl} onChange={e => handleChange('photoUrl', e.target.value)} />
						</div>

						<div>
							<label className='block text-sm font-medium text-text-muted mb-1'>Type</label>
							<select className={inputClass} value={formData.type} onChange={e => handleChange('type', e.target.value)} required>
								<option value=''>Select vehicle type</option>
								<option value='car'>Car</option>
								<option value='motorcycle'>Motorcycle</option>
							</select>
						</div>
					</div>
				</div>

				{/* Coluna da informação principal */}
				<div className='space-y-4'>
					{[
						{ id: 'vehicleName', label: 'Vehicle name (optional)', required: false },
						{ id: 'brand', label: 'Brand', required: true },
						{ id: 'model', label: 'Model', required: true },
						{ id: 'licensePlate', label: 'License Plate', required: true },
						{ id: 'year', label: 'Year', required: true },
						{ id: 'kilometers', label: 'Kilometers', required: true },
					].map(field => (
						<div key={field.id}>
							<label className='block text-sm font-medium text-text-muted mb-1'>{field.label}</label>
							<input
								type={field.id === 'year' || field.id === 'kilometers' ? 'number' : 'text'}
								className={inputClass}
								value={formData[field.id as keyof typeof formData]}
								onChange={e => handleChange(field.id, field.id === 'year' || field.id === 'kilometers' ? Number(e.target.value) : e.target.value)}
								required={field.required}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Secção de datas */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Insurance payment date</label>
					<input type='date' className={inputClass} value={formData.insuranceDate} onChange={e => handleChange('insuranceDate', e.target.value)} required />
				</div>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Inspection date</label>
					<input type='date' className={inputClass} value={formData.inspectionDate} onChange={e => handleChange('inspectionDate', e.target.value)} required />
				</div>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Car Circulation Unified Tax payment date</label>
					<input type='date' className={inputClass} value={formData.taxDate} onChange={e => handleChange('taxDate', e.target.value)} required />
				</div>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Scheduled vehicle service date</label>
					<input type='date' className={inputClass} value={formData.maintenanceDate} onChange={e => handleChange('maintenanceDate', e.target.value)} required />
				</div>
			</div>

			<div className='pt-6'>
				<button type='submit' disabled={loading} className='bg-primary hover:bg-accent text-white font-medium px-4 py-2 rounded w-full transition disabled:opacity-50'>
					{loading ? (mode === 'edit' ? 'Saving changes...' : 'Saving...') : mode === 'edit' ? 'Save Changes' : 'Save Vehicle'}
				</button>

				{success && <p className='text-accent mt-2 text-sm text-center'>Success!</p>}
				{error && <p className='text-red-500 mt-2 text-sm text-center'>{error}</p>}
			</div>
		</form>
	);
};

export default GarageVehicleForm;
