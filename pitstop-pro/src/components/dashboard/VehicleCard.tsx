import { FC } from 'react';
import { GarageVehicle } from '../../types/garageVehicle';
import { Link } from 'react-router-dom';

type Props = {
	vehicle: GarageVehicle;
};

const VehicleCard: FC<Props> = ({ vehicle }) => {
	return (
		<div className='p-6 rounded-xl bg-surface border border-border flex flex-col items-center text-center shadow-sm'>
			{vehicle.image ? (
				<img src={vehicle.image} alt='Vehicle' className='rounded-full w-28 h-28 object-cover border border-border mb-4' />
			) : (
				<div className='rounded-full w-28 h-28 bg-background flex items-center justify-center text-sm text-text-muted border border-dashed border-border mb-4'>No photo</div>
			)}

			<h2 className='text-lg font-semibold text-text break-words'>{vehicle.vehicleName || `${vehicle.brand} ${vehicle.model}`}</h2>

			<p className='text-sm text-text-muted'>{vehicle.licensePlate}</p>

			<Link to='/vehicles' className='mt-4 text-sm text-accent inline-flex items-center gap-1 group'>
				<span className='text-xl leading-none'>＋</span>
				<span className='underline-offset-2 group-hover:underline'>More details</span>
			</Link>
		</div>
	);
};

export default VehicleCard;
