import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
	const context = useContext(AuthContext);

	const logout = async () => {
		await signOut(auth);
	};

	return {
		...context,
		logout,
	};
};
