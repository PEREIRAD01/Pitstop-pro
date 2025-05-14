import React from 'react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
};

const GarageBaseVehicleModal: React.FC<Props> = ({ isOpen, onClose, title, icon, children }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
			<div className='bg-background text-text p-6 rounded-2xl shadow-2xl relative w-full max-w-4xl border border-border'>
				<button onClick={onClose} className='absolute top-4 right-4 text-text-muted hover:text-red-600 text-xl' aria-label='Close modal' title='Close'>
					×
				</button>

				<div className='flex items-center gap-2 mb-6'>
					{icon}
					<h2 className='text-2xl font-semibold'>{title}</h2>
				</div>

				{children}
			</div>
		</div>
	);
};

export default GarageBaseVehicleModal;
