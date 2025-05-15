import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function PrivateLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='flex pt-16'>
			<Sidebar isOpen={sidebarOpen} />

			<main className={`px-6 py-8 w-full transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
				<div className='max-w-7xl mx-auto'>
					<Outlet />
				</div>
			</main>

			<Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
		</div>
	);
}

export default PrivateLayout;
