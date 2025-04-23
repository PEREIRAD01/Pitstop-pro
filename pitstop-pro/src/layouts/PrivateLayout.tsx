import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function PrivateLayout() {
	return (
		<div className='flex'>
			<Sidebar />
			<main className='ml-64 p-6 w-full'>
				<Outlet />
			</main>
		</div>
	);
}

export default PrivateLayout;
