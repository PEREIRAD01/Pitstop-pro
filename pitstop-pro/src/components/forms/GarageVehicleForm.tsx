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
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [licensePlate, setLicensePlate] = useState('');
	const [type, setType] = useState('');
	const [kilometers, setKilometers] = useState(0);
	const [year, setYear] = useState(new Date().getFullYear());

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (mode === 'edit' && defaultValues) {
			setBrand(defaultValues.brand);
			setModel(defaultValues.model);
			setLicensePlate(defaultValues.licensePlate);
			setType(defaultValues.type);
			setKilometers(defaultValues.kilometers);
			setYear(defaultValues.year);
		}
	}, [mode, defaultValues]);

	const inputClass = 'border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white';

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

		const vehicleData = {
			brand,
			model,
			licensePlate,
			type,
			kilometers,
			year,
			image: '',
			userId: user.uid,
		};

		try {
			if (mode === 'edit' && defaultValues?.id) {
				const ref = doc(db, 'vehicles', defaultValues.id);
				await updateDoc(ref, vehicleData);
			} else {
				await addDoc(collection(db, 'vehicles'), vehicleData);
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
		<form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<input type='text' placeholder='Brand' className={inputClass} value={brand} onChange={e => setBrand(e.target.value)} required />
			<input type='text' placeholder='Model' className={inputClass} value={model} onChange={e => setModel(e.target.value)} required />
			<input type='text' placeholder='License Plate' className={inputClass} value={licensePlate} onChange={e => setLicensePlate(e.target.value)} required />
			<select className={inputClass} value={type} onChange={e => setType(e.target.value)} required>
				<option value=''>Select Type</option>
				<option value='car'>Car</option>
				<option value='motorcycle'>Motorcycle</option>
			</select>
			<input type='number' placeholder='Kilometers' className={inputClass} value={kilometers} onChange={e => setKilometers(Number(e.target.value))} required />
			<input type='number' placeholder='Year' className={inputClass} value={year} onChange={e => setYear(Number(e.target.value))} required />

			<div className='col-span-full'>
				<button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition w-full disabled:opacity-60 disabled:cursor-not-allowed' disabled={loading}>
					{loading ? (mode === 'edit' ? 'Saving changes...' : 'Saving...') : mode === 'edit' ? 'Save Changes' : 'Save Vehicle'}
				</button>

				{success && <p className='text-green-600 mt-2 text-sm text-center'>Success!</p>}
				{error && <p className='text-red-600 mt-2 text-sm text-center'>{error}</p>}
			</div>
		</form>
	);
};

export default GarageVehicleForm;
