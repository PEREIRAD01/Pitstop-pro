function Dashboard() {
	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Visão Geral</h1>

			{/* Secção dos Veículos */}
			<section className='mb-10'>
				<h2 className='text-xl font-semibold mb-4'>Os Meus Veículos</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{/* <VehicleCard /> x3 (mock futuros) */}
					<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground'>Sem veículos registados.</div>
				</div>
			</section>

			{/* Secção de Eventos */}
			<section>
				<h2 className='text-xl font-semibold mb-4'>Próximos Eventos</h2>
				<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground'>Nenhum evento agendado.</div>
			</section>
		</div>
	);
}

export default Dashboard;
