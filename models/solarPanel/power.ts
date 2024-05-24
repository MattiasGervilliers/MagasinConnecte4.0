export type powerData = {
  date: string,
  value: number,
}

export type Power = {
  timeUnit: string,
  unit: string,
  values: powerData[],
}