import React from 'react';
import { format } from 'date-fns';
import { Check } from 'phosphor-react';

type Props = {
	label: string;
	date?: string;
	done?: boolean;
	onMarkAsDone?: () => void;
};

const GarageEventLine: React.FC<Props> = ({ label, date, done, onMarkAsDone }) => {
	const formatDate = (value?: string) => {
		if (!value) return '-';
		const parsed = new Date(value);
		return isNaN(parsed.getTime()) ? '-' : format(parsed, 'MMMM, d');
	};

	return (
		<li className='text-sm text-text-muted flex items-center justify-between'>
			<span>
				{label}: {done ? <span className='text-primary font-semibold'>&#10003; Done</span> : formatDate(date)}
			</span>

			{!done && onMarkAsDone && (
				<button type='button' onClick={onMarkAsDone} title={`Mark ${label.toLowerCase()} as done`} className='text-xs text-accent hover:underline flex items-center gap-1 ml-2'>
					<Check size={14} /> Mark as done
				</button>
			)}
		</li>
	);
};

export default GarageEventLine;
