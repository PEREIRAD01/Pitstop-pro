import { getAuth, deleteUser } from 'firebase/auth';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

function DeleteAccountSection() {
	const auth = getAuth();
	const navigate = useNavigate();
	const user = auth.currentUser;

	const handleDeleteAccount = async () => {
		if (!user) return;

		const confirm = window.confirm('Are you sure you want to permanently delete your account and all your data? This action cannot be undone.');
		if (!confirm) return;

		try {
			
			const vehiclesSnap = await getDocs(query(collection(db, 'vehicles'), where('userId', '==', user.uid)));
			await Promise.all(vehiclesSnap.docs.map(doc => deleteDoc(doc.ref)));

			
			const partsSnap = await getDocs(query(collection(db, 'trackedParts'), where('userId', '==', user.uid)));
			await Promise.all(partsSnap.docs.map(doc => deleteDoc(doc.ref)));

			
			await deleteUser(user);

			
			navigate('/');
		} catch (error) {
			console.error('Error deleting account:', error);
			alert('An error occurred while deleting your account. Please try again later.');
		}
	};

	return (
		<section className='space-y-4'>
			<h2 className='text-xl font-semibold text-destructive'>Delete Account</h2>
			<p className='text-muted-foreground'>This action is irreversible. All your data will be permanently deleted.</p>
			<button onClick={handleDeleteAccount} className='bg-destructive text-white px-4 py-2 rounded hover:bg-destructive/90 transition'>
				Delete Account
			</button>
		</section>
	);
}

export default DeleteAccountSection;
