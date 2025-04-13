import { Link } from 'react-router-dom';

function LandingFooter() {
	return (
		<footer className='bg-surface text-gray-400 text-sm text-center py-4'>
			<div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-6'>
				<div className='flex gap-4'>
					<Link to='#' className='hover:underline'>
						Terms
					</Link>
					<Link to='#' className='hover:underline'>
						Privacy
					</Link>
					<Link to='#' className='hover:underline'>
						Contact
					</Link>
				</div>
				<p>© {new Date().getFullYear()} PitStop Pro</p>
			</div>
		</footer>
	);
}

export default LandingFooter;
