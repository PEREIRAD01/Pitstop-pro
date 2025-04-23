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
}
