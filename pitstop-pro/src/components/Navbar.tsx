import { Link } from 'react-router-dom';
import logo from '../assets/logo-flat.png';

function Navbar() {
	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-surface text-text px-6 py-4 shadow-md'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<Link to='/' aria-label='Go to homepage' className="flex items-center transition-transform hover:scale-105 cursor-pointer">
					<img
						src={logo}
						alt='PitStop Pro Logo'
						className='h-12 w-auto'
					/>
					<span className='text-xl font-semibold text-primary hidden sm:inline'>PitStop Pro</span>
				</Link>

				<ul className='flex gap-4 items-center'>
					<li>
						<Link to='/login' className='px-4 py-2 rounded-md bg-surface border border-primary text-primary hover:bg-primary hover:text-background transition-colors cursor-pointer'>
							Login
						</Link>
					</li>
					<li>
						<Link to='/register' className='px-4 py-2 rounded-md bg-primary text-background hover:bg-opacity-90 transition-colors cursor-pointer'>
							Register
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
