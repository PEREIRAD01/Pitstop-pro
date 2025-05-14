import React from 'react';

type Props = {
	insuranceDate: string;
	inspectionDate: string;
	taxDate: string;
	maintenanceDate: string;
	onChange: (field: string, value: string) => void;
	inputClass: string;
};

const GarageVehicleDates: React.FC<Props> = ({ insuranceDate, inspectionDate, taxDate, maintenanceDate, onChange, inputClass }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			<input type='date' className={inputClass} value={insuranceDate} onChange={e => onChange('insuranceDate', e.target.value)} required />
			<input type='date' className={inputClass} value={inspectionDate} onChange={e => onChange('inspectionDate', e.target.value)} required />
			<input type='date' className={inputClass} value={taxDate} onChange={e => onChange('taxDate', e.target.value)} required />
			<input type='date' className={inputClass} value={maintenanceDate} onChange={e => onChange('maintenanceDate', e.target.value)} required />
		</div>
	);
};

export default GarageVehicleDates;
