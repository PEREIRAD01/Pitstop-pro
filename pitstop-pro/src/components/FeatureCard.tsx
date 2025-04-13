import { IconProps } from 'phosphor-react';

interface FeatureCardProps {
	Icon: React.ComponentType<IconProps>;
	title: string;
	description: string;
}

function FeatureCard({ Icon, title, description }: FeatureCardProps) {
	return (
		<div className='border border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-surface'>
			<div className='flex justify-center mb-4'>
				<Icon size={40} weight='duotone' className='text-primary' />
			</div>
			<h3 className='text-xl font-semibold'>{title}</h3>
			<p className='text-gray-400 text-sm mt-2'>{description}</p>
		</div>
	);
}

export default FeatureCard;
