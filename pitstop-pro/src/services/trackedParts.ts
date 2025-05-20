import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { TrackedPart } from '../types/maintenance';

const COLLECTION = 'trackedParts';

export const createTrackedPart = async (part: TrackedPart) => {
	await addDoc(collection(db, COLLECTION), part);
};

export const fetchTrackedPartsByUser = async (userId: string): Promise<TrackedPart[]> => {
	const q = query(collection(db, COLLECTION), where('userId', '==', userId));
	const snapshot = await getDocs(q);

	return snapshot.docs.map(docSnap => ({
		id: docSnap.id,
		...(docSnap.data() as Omit<TrackedPart, 'id'>),
	}));
};

export const updateTrackedPart = async (part: TrackedPart) => {
	const ref = doc(db, COLLECTION, part.id);
	const { id: _, ...rest } = part;
	void _;
	await updateDoc(ref, rest);
};

export const deleteTrackedPart = async (id: string) => {
	await deleteDoc(doc(db, COLLECTION, id));
};
