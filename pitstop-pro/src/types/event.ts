export interface Event {
	id: string;
	vehicleId: string;
	vehicleName: string;
	type: 'inspection' | 'insurance' | 'tax' | 'scheduled maintenance' | 'custom';
	title: string;
	date: string;
	notes?: string;
}
