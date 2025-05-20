import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import MyVehicles from '../components/dashboard/MyVehicles';

function Dashboard() {
	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Overview</h1>
			<UpcomingEvents />
			<MyVehicles />
		</div>
	);
}

export default Dashboard;
