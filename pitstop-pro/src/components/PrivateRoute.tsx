import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className='text-center py-20 text-text'>Loading...</div>;
	}

	return user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
