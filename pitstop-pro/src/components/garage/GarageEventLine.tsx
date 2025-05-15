import React from 'react';

type Props = {
	label: string;
	date?: string;
	done?: boolean;
	onMarkAsDone: () => void;
};

const GarageEventLine: React.FC<Props> = ({ label, date, done, onMarkAsDone }) => {
	let formattedDate = 'No date set';
	let dateStatusClass = 'text-xs';

	if (date) {
		const today = new Date();
		const target = new Date(date);
		formattedDate = target.toLocaleDateString();

		const isPast = target < new Date(today.setHours(0, 0, 0, 0));
		const isToday = target.toDateString() === new Date().toDateString();

		if (isToday) {
			dateStatusClass += ' text-warning/70 font-medium';
		} else if (isPast) {
			dateStatusClass += ' text-destructive/70 line-through';
		} else {
			dateStatusClass += ' text-muted-foreground';
		}
	} else {
		dateStatusClass += ' text-muted-foreground';
	}

	return (
		<>
			<div>
				<p className='text-sm font-medium'>{label}</p>
				<p className={dateStatusClass}>{formattedDate}</p>
			</div>

			<div className='flex items-center justify-center'>
				<input type='checkbox' checked={done} onClick={e => e.stopPropagation()} onChange={onMarkAsDone} className='accent-accent w-4 h-4' />
			</div>
		</>
	);
};

export default GarageEventLine;
