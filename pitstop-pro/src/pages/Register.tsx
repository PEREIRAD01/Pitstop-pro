import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {
	const navigate = useNavigate();

	const handleRegister = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
		navigate('/dashboard');
	};

	return (
		<div className='min-h-screen bg-background text-text pt-20 px-4 flex justify-center items-start'>
			<div className='w-full max-w-md bg-surface rounded-xl shadow-lg px-6 py-8 sm:px-8 border border-neutral-700 mt-10 md:mt-20'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center text-primary mb-6'>Create Account</h2>
				<RegisterForm onSubmit={handleRegister} />
			</div>
		</div>
	);
}
