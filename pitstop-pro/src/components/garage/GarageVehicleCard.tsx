import React from 'react';
import { GarageVehicle } from '../../types/garageVehicle';

type Props = {
	vehicle: GarageVehicle;
};

const GarageVehicleCard: React.FC<Props> = ({ vehicle }) => {
	return (
		<div className='border p-4 rounded shadow-sm'>
			<h2 className='font-semibold text-lg'>
				{vehicle.brand} {vehicle.model}
			</h2>
			<p className='text-sm text-gray-500'>{vehicle.licensePlate}</p>
			<p className='text-sm text-gray-500'>{vehicle.kilometers} km</p>
		</div>
	);
};

export default GarageVehicleCard;
