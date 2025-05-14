import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { getFirebaseAuthErrorMessage } from '../../firebase/firebaseErrors';

type RegisterFormProps = {
	onSubmit: (email: string, password: string) => Promise<void>;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		setLoading(true);
		try {
			await onSubmit(email, password);
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
			<div>
				<label htmlFor='email' className='block mb-1 text-sm text-gray-400'>
					Email
				</label>
				<input
					id='email'
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					className='w-full px-4 py-2 rounded-md bg-background border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base'
					placeholder='Your email'
				/>
			</div>

			<div>
				<label htmlFor='password' className='block mb-1 text-sm text-gray-400'>
					Password
				</label>
				<input
					id='password'
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					className='w-full px-4 py-2 rounded-md bg-background border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base'
					placeholder='Your password'
				/>
			</div>

			<div>
				<label htmlFor='confirmPassword' className='block mb-1 text-sm text-gray-400'>
					Confirm Password
				</label>
				<input
					id='confirmPassword'
					type='password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
					className='w-full px-4 py-2 rounded-md bg-background border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base'
					placeholder='Confirm your password'
				/>
			</div>

			<button
				type='submit'
				className='w-full bg-primary text-background py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
				disabled={loading}
			>
				{loading ? 'Registering...' : 'Register'}
			</button>

			{error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
		</form>
	);
}
