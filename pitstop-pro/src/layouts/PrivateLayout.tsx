import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function PrivateLayout() {
	return (
		<div className='flex pt-16'>
			<Sidebar />
			<main className='ml-64 px-6 py-8 w-full'>
				<div className='max-w-7xl mx-auto'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default PrivateLayout;
