import { Wrench, CurrencyEur, BellRinging } from 'phosphor-react';
import FeatureCard from './FeatureCard';

function Features() {
	return (
		<section className='bg-background text-text py-16 px-6'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
				<FeatureCard Icon={Wrench} title='Organized Maintenance' description='Easily track and schedule each vehicle service.' />
				<FeatureCard Icon={CurrencyEur} title='Expense Tracking' description='Know exactly how much you vehicle is costing you on maintenance, repairs and insurance.' />
				<FeatureCard Icon={BellRinging} title='Useful Reminders' description='Never forget your inspections or IUC again.' />
			</div>
		</section>
	);
}

export default Features;
