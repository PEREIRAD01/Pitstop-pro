export type TrackedPart = {
	id: string;
	vehicleId: string;
	vehicleName?: string;
	partName: string;
	installDate: string;
	installKilometers: number;
	validForMonths?: number;
	validForKm?: number;
	userId: string;
	notes?: string;
};
