import { useState } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

function ChangePasswordSection() {
	const auth = getAuth();
	const user = auth.currentUser;

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		setError('');

		if (!user || !user.email) return;

		try {
			const credential = EmailAuthProvider.credential(user.email, currentPassword);
			await reauthenticateWithCredential(user, credential);
			await updatePassword(user, newPassword);

			setMessage('Password updated successfully.');
			setCurrentPassword('');
			setNewPassword('');
		} catch (err) {
			console.error(err);
			setError('Failed to update password. Please check your current password and try again.');
		}
	};

	return (
		<section className='space-y-4'>
			
			<form onSubmit={handleChangePassword} className='space-y-4 max-w-sm'>
				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>Current Password</label>
					<input type='password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className='w-full px-3 py-2 rounded border border-border bg-input text-text' required />
				</div>

				<div>
					<label className='block text-sm font-medium text-text-muted mb-1'>New Password</label>
					<input
						type='password'
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
						className='w-full px-3 py-2 rounded border border-border bg-input text-text'
						minLength={6}
						required
					/>
				</div>

				<button type='submit' className='px-4 py-2 rounded border border-primary text-primary bg-surface hover:bg-primary hover:text-white transition-colors'>
					Update Password
				</button>

				{message && <p className='text-sm text-accent'>{message}</p>}
				{error && <p className='text-sm text-destructive'>{error}</p>}
			</form>
		</section>
	);
}

export default ChangePasswordSection;
