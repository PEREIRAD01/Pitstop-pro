import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

export default function ForgotPassword() {
	const handleReset = async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	};

	return (
		<div className='min-h-screen bg-background text-text pt-20 px-4 flex justify-center items-start'>
			<div className='w-full max-w-md bg-surface rounded-xl shadow-lg px-6 py-8 sm:px-8 border border-neutral-700 mt-10 md:mt-20'>
				<h2 className='text-2xl sm:text-3xl font-bold text-center text-primary mb-6'>Reset your password</h2>
				<ForgotPasswordForm onSubmit={handleReset} />
			</div>
		</div>
	);
}
