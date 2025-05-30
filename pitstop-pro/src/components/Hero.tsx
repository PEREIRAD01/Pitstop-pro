import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import carIllustration from '../assets/car-illustration.png';

function Hero() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleGetStarted = () => {
		if (user) {
			navigate('/dashboard');
		} else {
			navigate('/register');
		}
	};

	return (
		<section className='bg-surface text-text py-16 px-6 pt-navbar'>
			<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12'>
				<div className='flex-1 space-y-6'>
					<h1 className='text-4xl sm:text-5xl font-bold leading-tight text-primary'>Simplified Vehicle Management</h1>
					<p className='text-lg text-gray-300'>Track maintenance, expenses, insurance and IUC – all in one place.</p>
					<div className='flex flex-wrap gap-4'>
						<button onClick={handleGetStarted} className='bg-primary text-background px-6 py-3 rounded-md text-base font-medium hover:bg-opacity-90 transition'>
							Get Started
						</button>
					</div>
				</div>

				<div className='flex-1'>
					<img src={carIllustration} alt='Illustration of a car' className='w-full max-w-md mx-auto' />
				</div>
			</div>
		</section>
	);
}

export default Hero;
