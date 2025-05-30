import { db } from '../firebase/config';
import { collection, setDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { TrackedPart } from '../types/maintenance';

const COLLECTION = 'trackedParts';

export const createTrackedPart = async (part: Omit<TrackedPart, 'id'>) => {
	const docRef = doc(collection(db, COLLECTION));
	const finalData: TrackedPart = { ...part, id: docRef.id };
	await setDoc(docRef, finalData);
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
	await updateDoc(doc(db, COLLECTION, part.id), part);
};

export const deleteTrackedPart = async (id: string) => {
	await deleteDoc(doc(db, COLLECTION, id));
};
