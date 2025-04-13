// src/pages/Home.tsx
function Home() {
	return (
		<section className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center'>
			<h1 className='text-4xl md:text-5xl font-bold text-primary mb-4'>Welcome to PitStop Pro</h1>
			<p className='text-lg text-gray-300 max-w-xl'>Your personal vehicle maintenance assistant. Manage inspections, costs, and important dates — all in one place.</p>
		</section>
	);
}

export default Home;
