import { ChangeEvent } from 'react';
import { Maintenance } from '../types/maintenance';
import EditableCell from './EditableCell';
import { useUserVehicles } from '../hooks/useUserVehicles';

interface Props {
	maintenances: Maintenance[];
	onUpdate: (data: Maintenance[]) => void;
}

function MaintenanceTable({ maintenances, onUpdate }: Props) {
	const { vehicles, loading } = useUserVehicles();

	const handleChange = (id: string, field: keyof Maintenance, value: string | number) => {
		const updated = maintenances.map(m => (m.id === id ? { ...m, [field]: value } : m));
		onUpdate(updated);
	};

	if (loading) {
		return <div className='p-6 text-muted-foreground text-center'>Loading vehicles...</div>;
	}

	return (
		<div className='overflow-x-auto rounded-lg border border-gray-700 shadow-sm bg-surface'>
			<table className='min-w-full text-sm text-left'>
				<thead className='bg-background border-b border-gray-600'>
					<tr>
						<th className='px-4 py-3 font-medium'>Date</th>
						<th className='px-4 py-3 font-medium'>Description</th>
						<th className='px-4 py-3 font-medium'>Vehicle</th>
						<th className='px-4 py-3 font-medium'>KM</th>
						<th className='px-4 py-3 font-medium'>Cost (€)</th>
					</tr>
				</thead>
				<tbody>
					{maintenances.map(m => (
						<tr key={m.id} className='border-b border-gray-700 hover:bg-muted transition'>
							<td className='px-4 py-2'>
								<EditableCell value={m.date} type='date' onChange={val => handleChange(m.id, 'date', val)} />
							</td>

							<td className='px-4 py-2'>
								<EditableCell value={m.description} onChange={val => handleChange(m.id, 'description', val)} />
							</td>

							<td className='px-4 py-2'>
								<select
									className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
									value={m.vehicleId}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(m.id, 'vehicleId', e.target.value)}
								>
									<option value=''>Select a vehicle</option>
									{vehicles.map(v => (
										<option key={v.id} value={v.id}>
											{v.brand} {v.model}
										</option>
									))}
								</select>
							</td>

							<td className='px-4 py-2'>
								<EditableCell value={m.kilometers} type='number' onChange={val => handleChange(m.id, 'kilometers', val)} />
							</td>

							<td className='px-4 py-2'>
								<EditableCell value={m.cost} type='number' onChange={val => handleChange(m.id, 'cost', val)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MaintenanceTable;
