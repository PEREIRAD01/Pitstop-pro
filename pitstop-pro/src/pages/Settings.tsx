import EditProfileSection from '../components/settings/EditProfileSection';
import ChangePasswordSection from '../components/settings/ChangePasswordSection';
import DeleteAccountSection from '../components/settings/DeleteAccountSection';

function Settings() {
	return (
		<div className='p-6 max-w-3xl mx-auto'>
			<h1 className='text-3xl font-bold text-text mb-10'>Settings</h1>

			<div className='space-y-12'>
				<EditProfileSection />
				<ChangePasswordSection />
				<DeleteAccountSection />
			</div>
		</div>
	);
}

export default Settings;
