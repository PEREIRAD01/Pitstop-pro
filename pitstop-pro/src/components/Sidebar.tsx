import { Link, useLocation } from 'react-router-dom';

const menuItems = [
	{ path: '/dashboard', label: 'Overview' },
	{ path: '/vehicles', label: 'Garage' },
	{ path: '/maintenance', label: 'Maintenance' },
	{ path: '/expenses', label: 'Expenses' },
	{ path: '/documents', label: 'Documents' },
	{ path: '/settings', label: 'Settings' },
];

type SidebarProps = {
	isOpen: boolean;
	onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
	const location = useLocation();

	return (
		<>
			{isOpen && <div className='fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden' onClick={onClose} aria-label='Close sidebar overlay' />}

			
			<aside
				className={`
					fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-surface border-r border-border px-4 py-6 shadow-md z-40
					${isOpen ? 'block' : 'hidden'}
					md:block
				`}
			>
				<nav className='space-y-2'>
					{menuItems.map(item => (
						<Link
							key={item.path}
							to={item.path}
							onClick={onClose}
							className={`block px-4 py-2 rounded transition ${location.pathname === item.path ? 'bg-muted font-semibold text-white' : 'text-muted-foreground hover:bg-muted'}`}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>
		</>
	);
}

export default Sidebar;
