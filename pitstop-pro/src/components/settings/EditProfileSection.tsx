import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

function EditProfileSection() {
	const auth = getAuth();
	const user = auth.currentUser;

	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (user?.displayName) {
			setName(user.displayName);
		}
	}, [user]);

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		setError('');

		if (!user) return;

		try {
			await updateProfile(user, { displayName: name });
			setMessage('Profile updated successfully.');
		} catch (err) {
			console.error(err);
			setError('Failed to update profile. Please try again later.');
		}
	};

	return (
		<section className='space-y-4'>
			
			<form onSubmit={handleUpdateProfile} className='space-y-4 max-w-sm'>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Your Name</label>
					<input type='text' value={name} onChange={e => setName(e.target.value)} className='w-full px-3 py-2 rounded border border-border bg-input text-text' />
				</div>

				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Email</label>
					<input type='email' value={user?.email || ''} disabled className='w-full px-3 py-2 rounded border border-border bg-muted text-muted-foreground' />
				</div>

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
