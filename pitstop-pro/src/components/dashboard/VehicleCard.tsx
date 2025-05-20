import { FC } from 'react';

type VehicleCardProps = {
	id: string;
	brand: string;
	model: string;
	licensePlate: string;
	kilometers: number;
};

const VehicleCard: FC<VehicleCardProps> = ({ brand, model, licensePlate, kilometers }) => {
	return (
		<div className='border p-4 rounded shadow-sm'>
			<h2 className='font-semibold text-lg'>
				{brand} {model}
			</h2>
			<p className='text-sm text-gray-500'>{licensePlate}</p>
			<p className='text-sm text-gray-500'>{kilometers} km</p>
		</div>
	);
};

export default VehicleCard;
