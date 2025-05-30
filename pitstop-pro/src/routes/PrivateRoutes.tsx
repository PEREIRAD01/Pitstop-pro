import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PrivateLayout from '../layouts/PrivateLayout';
import Dashboard from '../pages/Dashboard';
import MaintenancePage from '../pages/MaintenancePage';
import Vehicles from '../pages/GaragePage';
import Settings from '../pages/Settings';
import ExpensesPage from '../pages/ExpensesPage';
import DocumentsPage from '../pages/DocumentsPage';

const PrivateRoutes = (
	<Route element={<PrivateRoute />}>
		<Route element={<PrivateLayout />}>
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/maintenance' element={<MaintenancePage />} />
			<Route path='/vehicles' element={<Vehicles />} />
			<Route path='/expenses' element={<ExpensesPage />} />
			<Route path='/documents' element={<DocumentsPage />} />
			<Route path='/settings' element={<Settings />} />
		</Route>
	</Route>
);

export default PrivateRoutes;
