export type DataPeriod = {
  startDate: string,
  endDate: string,
}

export function parseDataPeriod(data: any): DataPeriod {
  return {
    startDate: data.dataPeriod.startDate,
    endDate: data.dataPeriod.endDate,
  };
}