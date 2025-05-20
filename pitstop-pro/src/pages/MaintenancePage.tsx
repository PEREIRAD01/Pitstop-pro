import { useCallback, useEffect, useState } from 'react';
import { TrackedPart } from '../types/maintenance';
import TrackedPartsTable from '../components/TrackedPartsTable';
import AddTrackedPartModal from '../components/modals/AddTrackedPartModal';
import { createTrackedPart, deleteTrackedPart, fetchTrackedPartsByUser, updateTrackedPart } from '../services/trackedParts';
import { getAuth } from 'firebase/auth';

function MaintenancePage() {
	const [parts, setParts] = useState<TrackedPart[]>([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
	const [partToEdit, setPartToEdit] = useState<TrackedPart | null>(null);

	const auth = getAuth();
	const user = auth.currentUser;

	const loadParts = useCallback(async () => {
		if (!user) return;
		setLoading(true);
		const data = await fetchTrackedPartsByUser(user.uid);
		setParts(data);
		setLoading(false);
	}, [user]);

	useEffect(() => {
		loadParts();
	}, [loadParts]);

	const handleAddPart = async (newPart: TrackedPart) => {
		if (!user) return;
		await createTrackedPart({ ...newPart, userId: user.uid });
		await loadParts();
	};

	const handleEditPart = async (updated: TrackedPart) => {
		await updateTrackedPart(updated);
		await loadParts();
	};

	const handleDeletePart = async (id: string) => {
		const confirm = window.confirm('Are you sure you want to delete this part?');
		if (!confirm) return;
		await deleteTrackedPart(id);
		await loadParts();
	};

	const openAddModal = () => {
		setPartToEdit(null);
		setModalMode('add');
		setShowModal(true);
	};

	const openEditModal = (part: TrackedPart) => {
		setPartToEdit(part);
		setModalMode('edit');
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

			{loading ? <p className='text-muted-foreground text-sm'>Loading parts...</p> : <TrackedPartsTable parts={parts} onEdit={openEditModal} onDelete={handleDeletePart} />}

			<AddTrackedPartModal isOpen={showModal} mode={modalMode} defaultValues={partToEdit} onClose={() => setShowModal(false)} onAdd={handleAddPart} onEdit={handleEditPart} />
		</div>
	);
}

export default MaintenancePage;
