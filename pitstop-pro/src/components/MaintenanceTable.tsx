import { ChangeEvent } from 'react';
import { Maintenance } from '../types/maintenance';

interface Props {
	maintenances: Maintenance[];
	onUpdate: (data: Maintenance[]) => void;
}
function MaintenanceTable({ maintenances, onUpdate }: Props) {
	const handleChange = (id: string, field: keyof Maintenance, value: string | number) => {
		const updated = maintenances.map(m => (m.id === id ? { ...m, [field]: value } : m));
		onUpdate(updated);
	};

	return (
		<div className='overflow-x-auto rounded-lg border border-gray-700 shadow-sm bg-surface'>
			<table className='min-w-full text-sm text-left'>
				<thead className='bg-background border-b border-gray-600'>
					<tr>
						<th className='px-4 py-3 font-medium'>Data</th>
						<th className='px-4 py-3 font-medium'>Descrição</th>
						<th className='px-4 py-3 font-medium'>Veículo</th>
						<th className='px-4 py-3 font-medium'>KM</th>
						<th className='px-4 py-3 font-medium'>Custo (€)</th>
					</tr>
				</thead>
				<tbody>
					{maintenances.map(m => (
						<tr key={m.id} className='border-b border-gray-700 hover:bg-muted transition'>
							{/* Data */}
							<td className='px-4 py-2'>
								<input
									type='date'
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.date}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(m.id, 'date', e.target.value)}
								/>
							</td>

							{/* Descrição */}
							<td className='px-4 py-2'>
								<input
									type='text'
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.description}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(m.id, 'description', e.target.value)}
								/>
							</td>

							{/* Veículo */}
							<td className='px-4 py-2'>
								<select
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.vehicleId}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(m.id, 'vehicleId', e.target.value)}
								>
									<option value='v1'>Lexus RX</option>
									<option value='v2'>Street Bob</option>
									{/* futuras opções dinâmicas */}
								</select>
							</td>

							{/* KM */}
							<td className='px-4 py-2'>
								<input
									type='number'
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.kilometers}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(m.id, 'kilometers', Number(e.target.value))}
								/>
							</td>

							{/* Custo */}
							<td className='px-4 py-2'>
								<input
									type='number'
									step='0.01'
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.cost}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(m.id, 'cost', Number(e.target.value))}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MaintenanceTable;