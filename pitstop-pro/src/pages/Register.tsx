import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			const error = err as FirebaseError;
			setError(error.message);
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
				<br />
				<input type='password' placeholder='Palavra-passe' value={password} onChange={e => setPassword(e.target.value)} required />
				<br />
				<button type='submit'>Create an account</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}

export default Register;
