import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function EditProfileSection() {
	const auth = getAuth();
	const user = auth.currentUser;

	const [formData, setFormData] = useState({
		displayName: '',
		photoUrl: '',
		phone: '',
		address: '',
	});

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const loadProfile = async () => {
			if (!user) return;

			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setFormData({
					displayName: data.displayName || '',
					photoUrl: data.photoUrl || '',
					phone: data.phone || '',
					address: data.address || '',
				});
			}
		};

		loadProfile();
	}, [user]);

	const handleChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		setError('');

		if (!user) return;

		try {
			await updateDoc(doc(db, 'users', user.uid), { ...formData });
			await updateProfile(user, { displayName: formData.displayName });
			setMessage('Profile updated successfully.');
		} catch (err) {
			console.error(err);
			setError('Failed to update profile. Please try again later.');
		}
	};

	return (
		<section className='space-y-4'>
			<form onSubmit={handleSubmit} className='space-y-4 max-w-sm'>
				<input
					type='text'
					placeholder='Your name'
					value={formData.displayName}
					onChange={e => handleChange('displayName', e.target.value)}
					className='w-full px-3 py-2 rounded border border-border bg-input text-text'
				/>

				<input
					type='url'
					placeholder='Photo URL'
					value={formData.photoUrl}
					onChange={e => handleChange('photoUrl', e.target.value)}
					className='w-full px-3 py-2 rounded border border-border bg-input text-text'
				/>

				<input
					type='tel'
					placeholder='Phone number'
					value={formData.phone}
					onChange={e => handleChange('phone', e.target.value)}
					className='w-full px-3 py-2 rounded border border-border bg-input text-text'
				/>

				<input
					type='text'
					placeholder='Address'
					value={formData.address}
					onChange={e => handleChange('address', e.target.value)}
					className='w-full px-3 py-2 rounded border border-border bg-input text-text'
				/>

				<button type='submit' className='px-4 py-2 rounded border border-primary text-primary bg-surface hover:bg-primary hover:text-white transition-colors'>
					Update Profile
				</button>

				{message && <p className='text-sm text-accent'>{message}</p>}
				{error && <p className='text-sm text-destructive'>{error}</p>}
			</form>
		</section>
	);
}

export default EditProfileSection;
