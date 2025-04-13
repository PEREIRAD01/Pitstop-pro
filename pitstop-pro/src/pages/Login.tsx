import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { getFirebaseAuthErrorMessage } from '../firebase/firebaseErrors';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/dashboard');
		} catch (err) {
			const error = err as FirebaseError;
			setError(getFirebaseAuthErrorMessage(error));
			console.error('Login error:', error);
		}
	};

	return (
		<div className='min-h-screen bg-background text-text pt-20 px-4 flex justify-center items-start'>
			<div className='w-full max-w-md bg-surface rounded-xl shadow-lg px-6 py-8 sm:px-8 border border-neutral-700 mt-10 md:mt-20'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center text-primary mb-6'>Login</h2>

				<form onSubmit={handleLogin} className='space-y-4'>
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

					<button type='submit' className='w-full bg-primary text-background py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors'>
						Login
					</button>

					{error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
				</form>
			</div>
		</div>
	);
}

export default Login;
