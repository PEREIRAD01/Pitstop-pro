import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

export default function Login() {
	const navigate = useNavigate();

	const handleLogin = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/dashboard');
	};

	return (
		<div className='min-h-screen bg-background text-text pt-20 px-4 flex justify-center items-start'>
			<div className='w-full max-w-md bg-surface rounded-xl shadow-lg px-6 py-8 sm:px-8 border border-neutral-700 mt-10 md:mt-20'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center text-primary mb-6'>Login</h2>
				<LoginForm onSubmit={handleLogin} />
			</div>
		</div>
	);
}
