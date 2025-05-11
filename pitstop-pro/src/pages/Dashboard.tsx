function Dashboard() {
	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Overview</h1>

			<section className='mb-10'>
				<h2 className='text-xl font-semibold mb-4'>My Vehicles</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground'>No vehicles registered.</div>
				</div>
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
				<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground'>No events scheduled.</div>
			</section>
		</div>
	);
}

export default Dashboard;
