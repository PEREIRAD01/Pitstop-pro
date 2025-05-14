import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

type GarageAddVehicleFormProps = {
	onSuccess?: () => void;
};

const GarageAddVehicleForm: React.FC<GarageAddVehicleFormProps> = ({ onSuccess }) => {
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [licensePlate, setLicensePlate] = useState('');
	const [type, setType] = useState('');
	const [kilometers, setKilometers] = useState(0);
	const [year, setYear] = useState(new Date().getFullYear());

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const inputClass = 'border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess(false);
		setLoading(true);

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
			await addDoc(collection(db, 'vehicles'), vehicleData);
			setSuccess(true);
			if (onSuccess) onSuccess();
		} catch (err) {
			setError('Failed to add vehicle. Please try again.');
			console.error('Error adding vehicle:', err);
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
					{loading ? 'Saving...' : 'Save Vehicle'}
				</button>

				{success && <p className='text-green-600 mt-2 text-sm text-center'>Vehicle added successfully!</p>}
				{error && <p className='text-red-600 mt-2 text-sm text-center'>{error}</p>}
			</div>
		</form>
	);
};

export default GarageAddVehicleForm;
