import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { getFirebaseAuthErrorMessage } from '../../firebase/firebaseErrors';

type ForgotPasswordFormProps = {
	onSubmit: (email: string) => Promise<void>;
};

export default function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setLoading(true);

		try {
			await onSubmit(email);
			setMessage('We have sent you a password reset link.');
		} catch (err) {
			if (err instanceof FirebaseError) {
				setError(getFirebaseAuthErrorMessage(err));
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
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

			{message && <p className='text-green-500 text-sm text-center mt-4'>{message}</p>}
			{error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
		</form>
	);
}
