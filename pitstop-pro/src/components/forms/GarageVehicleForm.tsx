import { useEffect, useState } from 'react';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/config';
import { GarageVehicle } from '../../types/garageVehicle';

type Props = {
	mode: 'create' | 'edit';
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
				kilometers: defaultValues.kilometerHistory?.at(-1)?.value || 0,
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

	const inputClass = 'w-full h-10 px-3 rounded-md bg-input text-text placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent';

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
			vehicleName: formData.vehicleName,
			brand: formData.brand,
			model: formData.model,
			licensePlate: formData.licensePlate,
			type: formData.type,
			image: formData.photoUrl,
			year: formData.year,
			insuranceDate: formData.insuranceDate,
			inspectionDate: formData.inspectionDate,
			taxDate: formData.taxDate,
			maintenanceDate: formData.maintenanceDate,
			userId: user.uid,
			kilometerHistory: [
				{
					date: new Date().toISOString().split('T')[0],
					value: formData.kilometers,
				},
			],
		};

		try {
			if (mode === 'edit' && defaultValues?.id) {
				await updateDoc(doc(db, 'vehicles', defaultValues.id), dataToSave);
			} else {
				await addDoc(collection(db, 'vehicles'), dataToSave);
			}
			setSuccess(true);
			onSuccess?.();
		} catch {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='flex flex-col items-center w-full'>
					{formData.photoUrl ? (
						<img src={formData.photoUrl} alt='Vehicle' className='rounded-xl w-full max-w-sm object-cover border border-border' />
					) : (
						<div className='w-full max-w-sm aspect-[4/3] bg-surface text-muted-foreground flex items-center justify-center rounded-xl border border-dashed border-border'>No photo</div>
					)}

					<div className='mt-4 w-full space-y-4'>
						<div className='flex flex-col gap-1'>
							<label htmlFor='photoUrl' className='text-sm text-muted-foreground'>
								Photo URL
							</label>
							<input
								id='photoUrl'
								type='url'
								className={inputClass}
								placeholder='e.g. https://example.com/photo.jpg'
								value={formData.photoUrl}
								onChange={e => handleChange('photoUrl', e.target.value)}
							/>
						</div>

						<div className='flex flex-col gap-1'>
							<label htmlFor='type' className='text-sm text-muted-foreground'>
								Vehicle Type
							</label>
							<select id='type' className={inputClass} value={formData.type} onChange={e => handleChange('type', e.target.value)} required>
								<option value=''>Select type</option>
								<option value='car'>Car</option>
								<option value='motorcycle'>Motorcycle</option>
							</select>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					{[
						{ id: 'vehicleName', label: 'Vehicle Name', placeholder: 'Optional nickname', required: false },
						{ id: 'brand', label: 'Brand', placeholder: 'e.g. Yamaha', required: true },
						{ id: 'model', label: 'Model', placeholder: 'e.g. R1', required: true },
						{ id: 'licensePlate', label: 'License Plate', placeholder: 'e.g. 00-AA-00', required: true },
						{ id: 'year', label: 'Year', placeholder: 'e.g. 2020', required: true },
						{ id: 'kilometers', label: 'Kilometers', placeholder: 'e.g. 15000', required: true },
					].map(field => (
						<div key={field.id} className='flex flex-col gap-1'>
							<label htmlFor={field.id} className='text-sm text-muted-foreground'>
								{field.label}
							</label>
							<input
								id={field.id}
								placeholder={field.placeholder}
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

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
				{[
					{ id: 'insuranceDate', label: 'Insurance Date' },
					{ id: 'inspectionDate', label: 'Inspection Date' },
					{ id: 'taxDate', label: 'Tax Date' },
					{ id: 'maintenanceDate', label: 'Maintenance Date' },
				].map(field => (
					<div key={field.id} className='flex flex-col gap-1'>
						<label htmlFor={field.id} className='text-sm text-muted-foreground'>
							{field.label}
						</label>
						<input id={field.id} type='date' className={inputClass} value={formData[field.id as keyof typeof formData] as string} onChange={e => handleChange(field.id, e.target.value)} required />
					</div>
				))}
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
