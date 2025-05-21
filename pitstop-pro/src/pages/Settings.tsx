import DeleteAccountSection from '../components/settings/DeleteAccountSection';
import ChangePasswordSection from '../components/settings/ChangePasswordSection';
import EditProfileSection from '../components/settings/EditProfileSection';

function Settings() {
	return (
		<div className='p-6 max-w-4xl mx-auto space-y-8'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>

			<section className='space-y-4'>
				<h2 className='text-xl font-semibold'>Edit Profile</h2>
				<EditProfileSection />
			</section>

			<section className='space-y-4'>
				<h2 className='text-xl font-semibold'>Change Password</h2>
				<ChangePasswordSection />
			</section>

			<DeleteAccountSection />
		</div>
	);
}

export default Settings;
