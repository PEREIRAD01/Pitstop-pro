import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import MaintenancePage from './pages/Maintenance';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './layouts/PrivateLayout';

function App() {
	return (
		<div className='min-h-screen bg-background text-text font-sans'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />

					{/* Rotas privadas (com Sidebar via PrivateLayout) */}
					<Route
						element={
							<PrivateRoute>
								<PrivateLayout />
							</PrivateRoute>
						}
					>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/maintenance' element={<MaintenancePage />} />
						{/* outras páginas privadas */}
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
