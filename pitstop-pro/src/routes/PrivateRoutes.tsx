import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PrivateLayout from '../layouts/PrivateLayout';
import Dashboard from '../pages/Dashboard';
import MaintenancePage from '../pages/Maintenance';
import Vehicles from '../pages/GaragePage';

const PrivateRoutes = (
	<Route
		element={
			<PrivateRoute>
				<PrivateLayout />
			</PrivateRoute>
		}
	>
		<Route path='/dashboard' element={<Dashboard />} />
		<Route path='/maintenance' element={<MaintenancePage />} />
		<Route path='/vehicles' element={<Vehicles />} />
	</Route>
);

export default PrivateRoutes;
