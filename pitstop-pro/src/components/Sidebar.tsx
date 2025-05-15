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
};

function Sidebar({ isOpen }: SidebarProps) {
	const location = useLocation();

	return (
		<aside className={`${isOpen ? 'block' : 'hidden'} md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-surface border-r border-border px-4 py-6 shadow-md z-10`}>
			
			<nav className='space-y-2'>
				{menuItems.map(item => (
					<Link
						key={item.path}
						to={item.path}
						className={`block px-4 py-2 rounded transition ${location.pathname === item.path ? 'bg-muted font-semibold text-white' : 'text-muted-foreground hover:bg-muted'}`}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}

export default Sidebar;
