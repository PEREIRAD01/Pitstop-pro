export interface Vehicle {
	id: string;
	brand: string;
	model: string;
	licensePlate: string;
	kilometers: number;
	imageUrl?: string;
	year: number;
	taxPaid: boolean;
	insurancePaid: boolean;
	revisionDone: boolean;
	inspectionDone: boolean;
	totalCostThisYear: number;
	vehicleName?: string;
	insuranceDate?: string;
	inspectionDate?: string;
	taxDate?: string;
	maintenanceDate?: string;
}
