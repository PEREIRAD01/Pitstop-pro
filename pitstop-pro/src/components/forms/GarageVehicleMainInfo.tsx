import React from 'react';

type Props = {
	vehicleName: string;
	brand: string;
	model: string;
	licensePlate: string;
	onChange: (field: string, value: string) => void;
	inputClass: string;
};

const GarageVehicleMainInfo: React.FC<Props> = ({ vehicleName, brand, model, licensePlate, onChange, inputClass }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<input type='text' placeholder='Vehicle name (optional)' className={inputClass} value={vehicleName} onChange={e => onChange('vehicleName', e.target.value)} />
			<input type='text' placeholder='Brand' className={inputClass} value={brand} onChange={e => onChange('brand', e.target.value)} required />
			<input type='text' placeholder='Model' className={inputClass} value={model} onChange={e => onChange('model', e.target.value)} required />
			<input type='text' placeholder='License Plate' className={inputClass} value={licensePlate} onChange={e => onChange('licensePlate', e.target.value)} required />
		</div>
	);
};

export default GarageVehicleMainInfo;
