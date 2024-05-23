export type EnergyData = {
  date: string,
  value: number,
}

export type Energy = {
  timeUnit: string,
  unit: string,
  values: EnergyData[],
}