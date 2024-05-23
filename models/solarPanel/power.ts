export type powerData = {
  date: string,
  value: number,
}

export type Power = {
  timeUnit: string,
  unit: string,
  values: powerData[],
}

export function parsePower(data: any): Power {
  return {
    timeUnit: data.power.timeUnit,
    unit: data.power.unit,
    values: data.power.values.map((value: any) => ({
      date: value.date,
      value: value.value,
    })),
  };
}