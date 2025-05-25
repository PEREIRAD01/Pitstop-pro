import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserVehicles } from '../../services/vehicles';
import { GarageVehicle } from '../../types/garageVehicle';
import { Link } from 'react-router-dom';

type EventItem = {
	date: string;
	label: string;
	vehicleName: string;
	vehicleId: string;
	image?: string;
};

function UpcomingEvents() {
	const [events, setEvents] = useState<EventItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [visibleCount, setVisibleCount] = useState(5);

	useEffect(() => {
		const loadEvents = async () => {
			const auth = getAuth();
			const currentUser = auth.currentUser;
			if (!currentUser) return;

			const vehicles = await fetchUserVehicles();
			const upcoming: EventItem[] = [];

			const eventFields: {
				key: keyof GarageVehicle;
				doneKey: keyof GarageVehicle;
				label: string;
			}[] = [
				{ key: 'insuranceDate', doneKey: 'insuranceDone', label: 'Insurance payment date' },
				{ key: 'inspectionDate', doneKey: 'inspectionDone', label: 'Inspection date' },
				{ key: 'taxDate', doneKey: 'taxDone', label: 'Tax payment date' },
				{ key: 'maintenanceDate', doneKey: 'maintenanceDone', label: 'Scheduled maintenance' },
			];

			(vehicles as GarageVehicle[]).forEach(vehicle => {
				eventFields.forEach(({ key, doneKey, label }) => {
					const dateStr = vehicle[key] as string | undefined;
					const done = vehicle[doneKey] as boolean | undefined;

					if (!done && dateStr) {
						upcoming.push({
							date: dateStr,
							label,
							vehicleName: vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`,
							vehicleId: vehicle.id,
							image: vehicle.image,
						});
					}
				});
			});

			upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
			setEvents(upcoming);
			setLoading(false);
		};

		loadEvents();
	}, []);

	const formatDate = (raw: string) => {
		const date = new Date(raw);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<section>
			<h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>

			{loading ? (
				<p className='text-muted-foreground'>Loading events...</p>
			) : events.length === 0 ? (
				<div className='p-6 border border-gray-700 rounded-lg bg-surface text-center text-muted-foreground space-y-4'>
					<p>No upcoming events scheduled.</p>
					<Link to='/maintenance' className='inline-block px-6 py-3 bg-primary text-background rounded-md font-medium hover:bg-opacity-90 transition'>
						Add Maintenance
					</Link>
				</div>
			) : (
				<>
					<ul className='space-y-4'>
						{events.slice(0, visibleCount).map((event, index) => {
							const isOverdue = new Date(event.date) < new Date();

							return (
								<li key={`${event.vehicleId}-${event.label}-${index}`} className='p-4 bg-surface border border-border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
									<div className='flex items-center gap-4 text-text'>
										{event.image ? (
											<img src={event.image} alt='Vehicle' className='w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover border border-border' />
										) : (
											<div className='w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-background border border-dashed border-border flex items-center justify-center text-xs text-text-muted'>No photo</div>
										)}

										<div className='flex flex-col'>
											<span className='text-sm sm:text-base'>
												<strong>{formatDate(event.date)}</strong> — {event.label}
											</span>

											<Link to='/vehicles' className='text-accent text-sm underline-offset-2 hover:underline'>
												{event.vehicleName}
											</Link>

											{isOverdue && <span className='text-xs font-semibold text-destructive sm:hidden mt-1'>⚠️ Overdue</span>}
										</div>
									</div>

									{isOverdue && <span className='text-xs font-semibold text-destructive hidden sm:block'>⚠️ Overdue</span>}
								</li>
							);
						})}
					</ul>

					{events.length > visibleCount && (
						<div className='flex justify-center mt-4'>
							<button onClick={() => setVisibleCount(prev => prev + 5)} className='text-sm text-accent hover:underline'>
								Load more
							</button>
						</div>
					)}
				</>
			)}
		</section>
	);
}

export default UpcomingEvents;
