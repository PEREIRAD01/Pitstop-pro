import { useAuth } from '../hooks/useAuth';

function UserInfo() {
	const { user } = useAuth();

	if (!user) return null;

	return (
		<div className='flex items-center gap-3'>
			{user.photoURL ? (
				<img src={user.photoURL} alt={user.displayName || 'User'} className='w-10 h-10 rounded-full object-cover border border-border shadow' />
			) : (
				<div className='w-10 h-10 rounded-full bg-muted text-background flex items-center justify-center font-semibold'>{user.displayName?.charAt(0).toUpperCase() ?? 'U'}</div>
			)}
			<span className='text-sm'>{user.displayName}</span>
		</div>
	);
}

export default UserInfo;
