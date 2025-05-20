import { TrackedPart } from '../types/maintenance';
import { useUserVehicles } from '../hooks/useUserVehicles';

type Props = {
	parts: TrackedPart[];
	onEdit: (part: TrackedPart) => void;
	onDelete: (id: string) => void;
};

function TrackedPartsTable({ parts, onEdit, onDelete }: Props) {
	const { vehicles } = useUserVehicles();

	const getLimitDate = (installDate: string, months?: number) => {
		if (!months) return null;
		const date = new Date(installDate);
		date.setMonth(date.getMonth() + months);
		return date;
	};

	const isOverdue = (part: TrackedPart) => {
		const now = new Date();
		const vehicle = vehicles.find(v => v.id === part.vehicleId);
		const lastKmEntry = vehicle?.kilometerHistory?.at(-1);
		const currentKm = lastKmEntry?.value ?? 0;
		const dateLimit = part.validForMonths ? getLimitDate(part.installDate, part.validForMonths) : null;
		const kmLimit = part.validForKm ? part.installKilometers + part.validForKm : null;
		const dateExpired = dateLimit ? now > dateLimit : false;
		const kmExpired = kmLimit !== null ? currentKm >= kmLimit : false;
		return dateExpired || kmExpired;
	};

	const formatDate = (dateStr: string) => {
		const d = new Date(dateStr);
		return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
	};

	return (
		<div className='overflow-x-auto rounded-lg border border-gray-700 shadow-sm bg-surface'>
			<table className='min-w-full text-sm text-left'>
				<thead className='bg-background border-b border-gray-600'>
					<tr>
						<th className='px-4 py-3 font-medium'>Part</th>
						<th className='px-4 py-3 font-medium'>Vehicle</th>
						<th className='px-4 py-3 font-medium'>Installed</th>
						<th className='px-4 py-3 font-medium'>Limits</th>
						<th className='px-4 py-3 font-medium'>Status</th>
						<th className='px-4 py-3 font-medium text-right'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{parts.map(part => {
						const vehicle = vehicles.find(v => v.id === part.vehicleId);
						const dateLimit = getLimitDate(part.installDate, part.validForMonths);
						const kmLimit = part.validForKm ? part.installKilometers + part.validForKm : null;
						const overdue = isOverdue(part);

						return (
							<tr key={part.id} className='border-b border-gray-700 hover:bg-muted transition'>
								<td className='px-4 py-2'>{part.partName}</td>
								<td className='px-4 py-2'>{vehicle?.vehicleName || `${vehicle?.brand} ${vehicle?.model}` || '–'}</td>
								<td className='px-4 py-2'>
									{formatDate(part.installDate)} – {part.installKilometers.toLocaleString()} km
								</td>
								<td className='px-4 py-2'>
									{dateLimit ? formatDate(dateLimit.toISOString()) : '–'} / {kmLimit ? `${kmLimit.toLocaleString()} km` : '–'}
								</td>
								<td className='px-4 py-2'>{overdue ? <span className='text-sm font-semibold text-destructive'>⚠️ Overdue</span> : <span className='text-sm text-green-500'>✔ OK</span>}</td>
								<td className='px-4 py-2 text-right space-x-2'>
									<button onClick={() => onEdit(part)} className='text-sm text-accent hover:underline'>
										✏️ Edit
									</button>
									<button onClick={() => onDelete(part.id)} className='text-sm text-destructive hover:underline'>
										🗑️ Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default TrackedPartsTable;
