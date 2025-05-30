import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import PrivateRoutes from './routes/PrivateRoutes';
import { useAuth } from './hooks/useAuth';

function App() {
	const { loading } = useAuth();

	if (loading) {
		return <div className='text-center mt-10 text-muted-foreground'>Loading...</div>;
	}

	return (
		<div className='min-h-screen bg-background text-text font-sans'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />

					{PrivateRoutes}

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
