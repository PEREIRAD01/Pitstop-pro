import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo-flat.png';
import { useLocation } from 'react-router-dom';
import UserInfo from './UserInfo';

type NavbarProps = {
	onToggleSidebar: () => void;
};

function Navbar({ onToggleSidebar }: NavbarProps) {
	const { user, logout } = useAuth();
	const location = useLocation();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-surface text-text px-6 py-4 shadow-md'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<button onClick={onToggleSidebar} className='md:hidden border border-border text-text rounded px-3 py-2 hover:bg-border transition' aria-label='Toggle menu'>
						Menu
					</button>

					<Link to='/' className='flex items-center gap-2 transition-transform hover:scale-105'>
						<img src={logo} alt='' className='h-12 w-auto' />
						<span className='sr-only'>PitStop Pro</span>
						<span className='text-xl font-semibold text-primary hidden sm:inline'>PitStop Pro</span>
					</Link>
				</div>

				<div className='flex items-center gap-4'>
					{user && <UserInfo />}

					<ul className='flex gap-4 items-center text-sm sm:text-base'>
						{user ? (
							<>
								{location.pathname === '/' && (
									<li>
										<Link to='/dashboard' className='px-4 py-2 rounded-md border border-primary text-primary bg-surface hover:bg-primary hover:text-background transition-colors'>
											My Garage
										</Link>
									</li>
								)}
								<li>
									<button onClick={handleLogout} className='px-4 py-2 rounded-md border border-primary text-primary bg-surface hover:bg-primary hover:text-background transition-colors'>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								{location.pathname !== '/login' && (
									<li>
										<Link to='/login' className='px-4 py-2 rounded-md border border-primary text-primary bg-surface hover:bg-primary hover:text-background transition-colors'>
											Login
										</Link>
									</li>
								)}

								{location.pathname !== '/register' && (
									<li>
										<Link to='/register' className='px-4 py-2 rounded-md bg-primary text-background hover:bg-opacity-90 transition-colors'>
											Register
										</Link>
									</li>
								)}
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
