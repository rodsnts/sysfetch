import React, { useState, useEffect } from "react"
import { Text, Box, useInput, useApp } from "ink"

import type { cpuProps, gpuProps } from "./main.d.ts"

import si from "systeminformation"

export default function App() {
	const [cpu, setCpu] = useState<cpuProps>()
	const [gpu, setGpu] = useState<gpuProps>()
	const [gpuTemperature, setGpuTemperature] = useState<gpuProps["temperatureGpu"]>()
	const [cpuTemperature, setCpuTemperature] = useState<any>()

  const { exit } = useApp();

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

	useInput((input) => {
		if (input === "q") {
			exit()
		}
	})

	return (
		<Box flexDirection="row" width="100%">
			<Box flexDirection="column" borderStyle="single" borderColor="red" width="50%">
				<Text>
					CPU: <Text color="red">{cpu?.brand}</Text>
				</Text>
				<Text>
					CPU Temperature: <Text color="red">{cpuTemperature || "N/A"} °C</Text>
				</Text>
        <Text>
					Cores: <Text color="red">{cpu?.cores}</Text>
				</Text>
        <Text>
					Physical Cores: <Text color="red">{cpu?.physicalCores}</Text>
				</Text>
        <Text>
					Virtualization: <Text color={cpu?.virtualization ? "green" : "red"}>{cpu?.virtualization ? "yes" : "no"}</Text>
				</Text>
			</Box>

			<Box flexDirection="column" borderStyle="single" borderColor="green" width="50%">
				<Text>
					GPU: <Text color="green">{gpu?.name}</Text>
				</Text>
				<Text>
					GPU Temperature: <Text color="green">{gpuTemperature || "N/A"} °C</Text>
				</Text>
        <Text>
          GPU Utilization: <Text color="green">{gpu?.utilizationGpu}%</Text>
        </Text>
        <Text>
          VRAM: <Text color="green">{gpu?.vram}MB</Text>
        </Text>
        <Text>
          Driver Version: <Text color="green">{gpu?.driverVersion}</Text> 
        </Text>
			</Box>
		</Box>
	);
}
