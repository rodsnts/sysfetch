import React, { useState, useEffect } from 'react';
import { Text, Box, useInput, useApp } from 'ink';
import si from "systeminformation";

type cpuProps = {
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

type gpuProps = {
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


export default function App() {
	const [cpu, setCpu] = useState<cpuProps>()
	const [gpu, setGpu] = useState<gpuProps>()
	const [gpuTemperature, setGpuTemperature] = useState<gpuProps["temperatureGpu"]>()
	const [cpuTemperature, setCpuTemperature] = useState<any>()

	useEffect(() => {
		si.cpu()
			.then((data: any) => setCpu(data))

		si.graphics()
			.then((data: any) => setGpu(data.controllers[0]))

		const tempFetch = setInterval(() => {
			si.graphics()
				.then((data: any) => setGpuTemperature(data.controllers[0].temperatureGpu))
			si.cpuTemperature()
				.then((data: any) => setCpuTemperature(data.main))
		}, 250)

		return () => {
			clearInterval(tempFetch)
		}
	},[])

	const {exit} = useApp();

	useInput((input) => {
		if (input === "q") {
			exit()
		}
	})

	return (
		<Box flexDirection="row" width="100%">
			<Box flexDirection="column" borderStyle="single" width="50%">
				<Text>
					CPU: <Text color="red">{cpu?.brand}</Text>
				</Text>
				<Text>
					CPU: <Text color="red">{cpuTemperature || "N/A"} °C</Text>
				</Text>
			</Box>

			<Box flexDirection="column" borderStyle="single" width="50%">
				<Text>
					GPU: <Text color="green">{gpu?.name}</Text>
				</Text>
				<Text>
					GPU Temperature: <Text color="green">{gpuTemperature || "N/A"} °C</Text>
				</Text>
			</Box>
		</Box>
	);
}
