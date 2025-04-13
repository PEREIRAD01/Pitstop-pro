import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/dashboard'); 
		} catch (err) {
			const error = err as FirebaseError;
			setError(error.message);
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
				<br />
				<input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
				<br />
				<button type='submit'>Enter</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}

export default Login;
