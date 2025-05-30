import { Link, useLocation } from 'react-router-dom';
import { List, X } from 'phosphor-react';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo-flat.png';
import UserInfo from './UserInfo';
import { useState } from 'react';

type NavbarProps = {
	onToggleSidebar?: () => void;
};

function Navbar({ onToggleSidebar }: NavbarProps) {
	const { user, logout } = useAuth();
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const isProfileIncomplete = user && !user.displayName;

	const handleToggle = () => {
		setMenuOpen(!menuOpen);
		onToggleSidebar?.();
	};

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-surface text-text px-6 py-4 shadow-md'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					{onToggleSidebar && (
						<button onClick={handleToggle} className='md:hidden text-text hover:text-accent transition' aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
							{menuOpen ? <X size={24} /> : <List size={24} />}
						</button>
					)}

					<Link to='/' className='flex items-center gap-2 transition-transform hover:scale-105'>
						<img src={logo} alt='PitStop Pro logo' className='h-12 w-auto' />
						<span className='sr-only'>PitStop Pro</span>
						<span className='text-xl font-semibold text-primary hidden sm:inline'>PitStop Pro</span>
					</Link>
				</div>

				<div className='flex items-center gap-4'>
					{user && (
						<>
							<UserInfo />

							{isProfileIncomplete && (
								<Link to='/settings' title='Your profile is incomplete. Click to complete it.' className='text-xs text-yellow-400 font-medium hover:underline transition ml-2'>
									⚠️ Complete your profile
								</Link>
							)}
						</>
					)}

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
