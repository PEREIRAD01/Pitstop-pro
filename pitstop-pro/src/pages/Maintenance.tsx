import { useState } from 'react';
import MaintenanceTable from '../components/MaintenanceTable';
import { Maintenance } from '../types/maintenance';

function MaintenancePage() {
	const [maintenances, setMaintenances] = useState<Maintenance[]>([
		{
			id: '1',
			date: '2025-04-03',
			description: 'Troca de óleo e filtro',
			vehicleId: 'v1',
			vehicleName: 'Lexus RX',
			kilometers: 125000,
			cost: 120,
		},
		{
			id: '2',
			date: '2025-02-15',
			description: 'Revisão geral',
			vehicleId: 'v2',
			vehicleName: 'Street Bob',
			kilometers: 40000,
			cost: 80,
		},
	]);

	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Maintenance History</h1>
			<MaintenanceTable maintenances={maintenances} onUpdate={setMaintenances} />
		</div>
	);
}

export default MaintenancePage;
