import React from 'react';

type Props = {
	year: number;
	kilometers: number;
	photoUrl: string;
	type: string;
	onChange: (field: string, value: string | number) => void;
	inputClass: string;
};

const GarageVehicleDetails: React.FC<Props> = ({ year, kilometers, photoUrl, type, onChange, inputClass }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<input type='url' placeholder='Photo URL' className={inputClass} value={photoUrl} onChange={e => onChange('photoUrl', e.target.value)} />

			<select className={inputClass} value={type} onChange={e => onChange('type', e.target.value)} required>
				<option value=''>Select type</option>
				<option value='car'>Car</option>
				<option value='motorcycle'>Motorcycle</option>
			</select>

			<input type='number' placeholder='Year' className={inputClass} value={year} onChange={e => onChange('year', Number(e.target.value))} required />

			<input type='number' placeholder='Kilometers' className={inputClass} value={kilometers} onChange={e => onChange('kilometers', Number(e.target.value))} required />
		</div>
	);
};

export default GarageVehicleDetails;
