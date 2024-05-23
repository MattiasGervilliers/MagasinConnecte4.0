export type EnergyData = {
  date: string,
  value: number,
}

export type Energy = {
  timeUnit: string,
  unit: string,
  values: EnergyData[],
}

export function parseEnergy(data: any): Energy {
  return {
    timeUnit: data.energy.timeUnit,
    unit: data.energy.unit,
    values: data.energy.values.map((value: any) => ({
      date: value.date,
      value: value.value,
    })),
  };
}