import React from 'react';
import { getAuth } from 'firebase/auth';

const UserInfo: React.FC = () => {
	const user = getAuth().currentUser;
	const displayName = user?.displayName || user?.email;
	const photoURL = user?.photoURL;

	if (!user) return null;

	return (
		<div className='flex items-center gap-2'>
			{photoURL ? (
				<img src={photoURL} alt='User Avatar' className='w-8 h-8 rounded-full object-cover' />
			) : (
				<div className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-semibold'>{displayName?.charAt(0).toUpperCase()}</div>
			)}
			<span className='text-sm text-gray-800 dark:text-gray-200'>{displayName}</span>
		</div>
	);
};

export default UserInfo;
