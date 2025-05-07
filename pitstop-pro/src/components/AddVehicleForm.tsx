import React, { useState } from 'react';

const AddVehicleForm: React.FC = () => {
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [licensePlate, setLicensePlate] = useState('');
	const [type, setType] = useState('');
	const [kilometers, setKilometers] = useState(0);
	const [year, setYear] = useState(new Date().getFullYear());

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			brand,
			model,
			licensePlate,
			type,
			kilometers,
			year,
		});
	};

	return (
		<form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<input type='text' placeholder='Brand' className='border p-2 rounded' value={brand} onChange={e => setBrand(e.target.value)} />

			<input type='text' placeholder='Model' className='border p-2 rounded' value={model} onChange={e => setModel(e.target.value)} />

			<input type='text' placeholder='License Plate' className='border p-2 rounded' value={licensePlate} onChange={e => setLicensePlate(e.target.value)} />

			<select className='border p-2 rounded' value={type} onChange={e => setType(e.target.value)}>
				<option value=''>Select Type</option>
				<option value='car'>Car</option>
				<option value='motorcycle'>Motorcycle</option>
			</select>

			<input type='number' placeholder='Kilometers' className='border p-2 rounded' value={kilometers} onChange={e => setKilometers(Number(e.target.value))} />

			<input type='number' placeholder='Year' className='border p-2 rounded' value={year} onChange={e => setYear(Number(e.target.value))} />

			<div className='col-span-full'>
				<button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition'>
					Save Vehicle
				</button>
			</div>
		</form>
	);
};

export default AddVehicleForm;
