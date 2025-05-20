function MyVehicles() {
	return (
		<section>
			<h2 className='text-xl font-semibold mb-4'>My Vehicles</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground'>No vehicles registered.</div>
			</div>
		</section>
	);
}

export default MyVehicles;
