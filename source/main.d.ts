export interface cpuProps {
	manufacturer: string;
	brand: string;
	vendor: string;
	family: string;
	model: string;
	stepping: string;
	revision: string;
	voltage: string | number;
	speed: number;
	speedMin: number;
	speedMax: number;
	governor: string;
	cores: number;
	physicalCores: number;
	performanceCores: number;
	efficiencyCores: number;
	processors: number;
	socket: string;
	flags: string;
	virtualization: boolean;
	cache: {
		l1d: number;
		l1i: number;
		l2: number;
		l3: number;
	}
}

export interface gpuProps {
	vendor: string;
	subVendor: string;
	model: string;
	bus: string;
	busAddress: string;
	vram: number;
	vramDynamic: boolean;
	pciID: string;
	driverVersion: string;
	subDeviceId: string;
	name: string;
	pciBus: string;
	memoryTotal: number;
	memoryUsed: number;
	memoryFree: number;
	utilizationGpu: number;
	utilizationMemory: number;
	temperatureGpu: number;
	powerDraw: number;
	powerLimit: number;
	clockCore: number;
  clockMemory: number;
}
