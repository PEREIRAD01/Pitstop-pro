import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import MyVehicles from '../components/dashboard/MyVehicles';

function Dashboard() {
	return (
		<div className='p-6 max-w-7xl mx-auto space-y-12'>
			<UpcomingEvents />
			<MyVehicles />
		</div>
	);
}

export default Dashboard;
