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
			notes: '',
		},
	]);

	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
	const [partToEdit, setPartToEdit] = useState<TrackedPart | null>(null);

	// ✅ Adicionar nova peça
	const handleAddPart = (newPart: TrackedPart) => {
		setParts(prev => [...prev, newPart]);
	};

	// ✅ Atualizar peça existente
	const handleEditPart = (updated: TrackedPart) => {
		setParts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
	};

	// ✅ Remover peça
	const handleDeletePart = (id: string) => {
		const confirm = window.confirm('Are you sure you want to delete this part?');
		if (!confirm) return;
		setParts(prev => prev.filter(p => p.id !== id));
	};

	// ✅ Abrir modal em modo "editar"
	const openEditModal = (part: TrackedPart) => {
		setPartToEdit(part);
		setModalMode('edit');
		setShowModal(true);
	};

	// ✅ Abrir modal em modo "adicionar"
	const openAddModal = () => {
		setPartToEdit(null);
		setModalMode('add');
		setShowModal(true);
	};

	return (
		<div className='p-6 max-w-7xl mx-auto space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Maintenance - Tracked Parts</h1>
				<button onClick={openAddModal} className='bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition'>
					➕ Add Part
				</button>
			</div>

			<TrackedPartsTable parts={parts} onEdit={openEditModal} onDelete={handleDeletePart} />

			<AddTrackedPartModal isOpen={showModal} mode={modalMode} defaultValues={partToEdit} onClose={() => setShowModal(false)} onAdd={handleAddPart} onEdit={handleEditPart} />
		</div>
	);
}

export default MaintenancePage;
