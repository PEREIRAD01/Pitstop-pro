import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { saveUserProfile } from '../../services/user';
import { updateProfile } from 'firebase/auth';
import { db } from '../../firebase/config';

function EditProfileSection() {
	const { user } = useAuth();

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

			const ref = doc(db, 'users', user.uid);
			const snapshot = await getDoc(ref);

			if (snapshot.exists()) {
				const data = snapshot.data();
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
			await saveUserProfile(user.uid, formData);
			await updateProfile(user, {
				displayName: formData.displayName,
				photoURL: formData.photoUrl,
			});
			setMessage('Profile updated successfully.');
		} catch (err) {
			console.error(err);
			setError('Failed to update profile. Please try again later.');
		}
	};

	return (
		<section>
			<h2 className='text-xl font-semibold mb-4'>Edit Profile:        </h2>

			<div className='flex flex-col lg:flex-row gap-8'>
				<form onSubmit={handleSubmit} className='space-y-4 max-w-sm w-full'>
					<label className='block text-sm font-medium text-text-muted mb-1'>Name</label>
					<input
						type='text'
						placeholder='Your name'
						value={formData.displayName}
						onChange={e => handleChange('displayName', e.target.value)}
						className='w-full px-3 py-2 rounded border border-border bg-input text-text'
					/>
					<label className='block text-sm font-medium text-text-muted mb-1'>Profile Photo URL:</label>
					<input
						type='url'
						placeholder='Photo URL'
						value={formData.photoUrl}
						onChange={e => handleChange('photoUrl', e.target.value)}
						className='w-full px-3 py-2 rounded border border-border bg-input text-text'
					/>
					<label className='block text-sm font-medium text-text-muted mb-1'>Phone Number:</label>
					<input
						type='tel'
						placeholder='Phone number'
						value={formData.phone}
						onChange={e => handleChange('phone', e.target.value)}
						className='w-full px-3 py-2 rounded border border-border bg-input text-text'
					/>
					<label className='block text-sm font-medium text-text-muted mb-1'>Current Location (city, state):</label>
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

				{formData.photoUrl ? (
					<img src={formData.photoUrl} alt='Profile' className='rounded-full shadow w-60 h-60 object-cover border border-border' />
				) : (
					<div className='w-40 h-40 bg-surface border border-dashed border-border flex items-center justify-center text-muted-foreground rounded-full'>No photo</div>
				)}
			</div>
		</section>
	);
}

export default EditProfileSection;
