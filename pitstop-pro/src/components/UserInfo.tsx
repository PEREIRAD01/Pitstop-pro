import { useAuth } from '../hooks/useAuth';

function UserInfo() {
	const { user } = useAuth();

	if (!user) return null;

	const displayName = user.displayName ?? user.email ?? 'User';
	const initials = (user.displayName?.charAt(0) ?? user.email?.charAt(0) ?? 'U').toUpperCase();

	return (
		<div className='flex items-center gap-3'>
			{user.photoURL ? (
				<img src={user.photoURL} alt={displayName} className='w-10 h-10 rounded-full object-cover border border-border shadow' />
			) : (
				<div className='w-10 h-10 rounded-full bg-muted text-background flex items-center justify-center font-semibold'>{initials}</div>
			)}
			<span className='text-sm'>{displayName}</span>
		</div>
	);
}

export default UserInfo;
