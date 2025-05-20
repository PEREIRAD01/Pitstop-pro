export type GarageVehicle = {
	id: string;
	userId: string;
	brand: string;
	model: string;
	licensePlate: string;
	type: string;
	year: number;
	kilometerHistory: {
		date: string;
		value: number;
	}[];
	image: string;
	vehicleName?: string;
	insuranceDate?: string;
	inspectionDate?: string;
	taxDate?: string;
	maintenanceDate?: string;
	insuranceDone?: boolean;
	inspectionDone?: boolean;
	taxDone?: boolean;
	maintenanceDone?: boolean;
};
