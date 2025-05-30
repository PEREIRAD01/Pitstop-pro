import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className='text-center py-20 text-text'>Loading...</div>;
	}

	return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
