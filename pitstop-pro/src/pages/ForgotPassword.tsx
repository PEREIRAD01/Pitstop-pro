import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getFirebaseAuthErrorMessage } from '../firebase/firebaseErrors';
import { FirebaseError } from 'firebase/app';

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		setError('');
		setLoading(true);

		try {
			await sendPasswordResetEmail(auth, email);
			setMessage('We have sent you a password reset link.');
		} catch (err) {
			const error = err as FirebaseError;
			setError(getFirebaseAuthErrorMessage(error));
			console.error('Password reset error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-background text-text pt-20 px-4 flex justify-center items-start'>
			<div className='w-full max-w-md bg-surface rounded-xl shadow-lg px-6 py-8 sm:px-8 border border-neutral-700 mt-10 md:mt-20'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center text-primary mb-6'>Reset your password</h2>
				<form onSubmit={handleReset} className='space-y-4'>
					<input
						type='email'
						placeholder='Your email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className='w-full px-4 py-2 rounded-md bg-background border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base'
					/>
					<button
						type='submit'
						className='w-full bg-primary text-background py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
						disabled={loading}
					>
						{loading ? 'Sending...' : 'Send reset link'}
					</button>
				</form>

				{message && <p className='text-green-500 text-sm text-center mt-4'>{message}</p>}
				{error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
			</div>
		</div>
	);
}

export default ForgotPassword;
