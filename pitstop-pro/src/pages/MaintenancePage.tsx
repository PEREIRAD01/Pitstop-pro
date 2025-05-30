import { useCallback, useEffect, useState } from 'react';
import { TrackedPart } from '../types/maintenance';
import TrackedPartsTable from '../components/TrackedPartsTable';
import AddTrackedPartModal from '../components/modals/AddTrackedPartModal';
import { fetchTrackedPartsByUser, updateTrackedPart, deleteTrackedPart } from '../services/trackedParts';
import { getAuth } from 'firebase/auth';
import { collection, } from 'firebase/firestore';
import { db } from '../firebase/config';
import { setDoc, doc } from 'firebase/firestore';

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

	const handleAddPart = async (newPart: Omit<TrackedPart, 'id'>) => {
		if (!user) return;

		const docRef = doc(collection(db, 'trackedParts'));
		const finalData: TrackedPart = {
			...newPart,
			id: docRef.id,
		};

		await setDoc(docRef, finalData);
		await loadParts();
	};

	const handleEditPart = async (updated: TrackedPart) => {
		try {
			await updateTrackedPart(updated);
			await loadParts();
		} catch (error) {
			alert('Erro ao atualizar a peça no Firestore. Verifica a consola.');
			console.error('Erro ao atualizar:', updated, error);
		}
	};

	const handleDeletePart = async (id: string) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this part?');
		if (!confirmDelete) return;
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
		<main className='px-6 py-8 w-full'>
			<div className='max-w-7xl mx-auto space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>Maintenance - Tracked Parts</h1>
					<button onClick={openAddModal} className='bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition'>
						➕ Add Part
					</button>
				</div>

				{loading ? <p className='text-muted-foreground text-sm'>Loading parts...</p> : <TrackedPartsTable parts={parts} onEdit={openEditModal} onDelete={handleDeletePart} />}

				<AddTrackedPartModal isOpen={showModal} mode={modalMode} defaultValues={partToEdit} onClose={() => setShowModal(false)} onAdd={handleAddPart} onEdit={handleEditPart} />
			</div>
		</main>
	);
}

export default MaintenancePage;
