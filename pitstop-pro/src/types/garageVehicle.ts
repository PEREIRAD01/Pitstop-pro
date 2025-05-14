export type GarageVehicle = {
	id: string;
	userId: string;
	brand: string;
	model: string;
	licensePlate: string;
	type: string;
	kilometers: number;
	year: number;
	image: string;
	vehicleName?: string;
	insuranceDate?: string;
	inspectionDate?: string;
	taxDate?: string;
	maintenanceDate?: string;
};
