import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function PrivateLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleCloseSidebar = () => setSidebarOpen(false);

	return (
		<div className='pt-16'>
			<Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

			<Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

			<main
				className={`
					transition-all duration-300 px-6 py-8
					${sidebarOpen ? 'md:ml-64' : 'md:ml-64'} 
				`}
			>
				<div className='max-w-7xl mx-auto'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default PrivateLayout;
