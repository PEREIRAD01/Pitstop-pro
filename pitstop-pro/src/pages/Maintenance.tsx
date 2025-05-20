import { useState } from 'react';
import { TrackedPart } from '../types/maintenance';
import TrackedPartsTable from '../components/TrackedPartsTable';

function MaintenancePage() {
	const [parts] = useState<TrackedPart[]>([
		{
			id: '1',
			vehicleId: 'v1',
			vehicleName: 'Lexus RX',
			partName: 'Pastilhas de travão (frente)',
			installDate: '2025-05-03',
			installKilometers: 125000,
			validForMonths: 24,
			validForKm: 40000,
		},
		{
			id: '2',
			vehicleId: 'v2',
			vehicleName: 'Street Bob',
			partName: 'Filtro de óleo',
			installDate: '2025-04-15',
			installKilometers: 40000,
			validForMonths: 6,
			validForKm: 20000,
		},
	]);

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6'>
			<h1 className='text-2xl font-bold'>Maintenance - Tracked Parts</h1>
			<TrackedPartsTable parts={parts} />
		</div>
	);
}

export default MaintenancePage;
