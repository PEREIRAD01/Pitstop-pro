interface EditableCellProps {
	value: string | number;
	type?: 'text' | 'number' | 'date';
	onChange: (newValue: string | number) => void;
}

function EditableCell({ value, onChange, type = 'text' }: EditableCellProps) {
	return (
		<input
			type={type}
			className='bg-transparent border border-gray-500 px-2 py-1 rounded text-sm w-full'
			value={value}
			onChange={e => (type === 'number' ? onChange(Number(e.target.value)) : onChange(e.target.value))}
		/>
	);
}

export default EditableCell;
