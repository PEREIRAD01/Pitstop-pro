import DeleteAccountSection from '../components/settings/DeleteAccountSection';

function Settings() {
	return (
		<div className='p-6 max-w-4xl mx-auto space-y-8'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>

			<section className='space-y-4'>
				<h2 className='text-xl font-semibold'>Edit Profile</h2>
				<p className='text-muted-foreground'>Feature coming soon.</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-xl font-semibold'>Change Password</h2>
				<p className='text-muted-foreground'>Feature coming soon.</p>
			</section>

			<DeleteAccountSection />
		</div>
	);
}

export default Settings;
