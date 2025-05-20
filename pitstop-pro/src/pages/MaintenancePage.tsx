import { useState } from 'react';
import { TrackedPart } from '../types/maintenance';
import TrackedPartsTable from '../components/TrackedPartsTable';
import AddTrackedPartModal from '../components/modals/AddTrackedPartModal';

function MaintenancePage() {
	const [parts, setParts] = useState<TrackedPart[]>([
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
	]);

	const [showModal, setShowModal] = useState(false);

	const handleAddPart = (newPart: TrackedPart) => {
		setParts(prev => [...prev, newPart]);
	};

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Maintenance - Tracked Parts</h1>
				<button onClick={() => setShowModal(true)} className='bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition'>
					➕ Add Part
				</button>
			</div>

			<TrackedPartsTable parts={parts} />

			<AddTrackedPartModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddPart} />
		</div>
	);
}

export default MaintenancePage;
