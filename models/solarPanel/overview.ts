export type Overview = {
  lastUpdateTime: string;
  lifeTimeDataEnergy: number;
  lastYearDataEnergy: number;
  lastMonthDataEnergy: number;
  lastDayDataEnergy: number;
  currentPower: number;
}

export function parseOverview(data: any): Overview {
  return {
    lastUpdateTime: data.overview.lastUpdateTime,
    lifeTimeDataEnergy: data.overview.lifeTimeData.energy,
    lastYearDataEnergy: data.overview.lastYearData.energy,
    lastMonthDataEnergy: data.overview.lastMonthData.energy,
    lastDayDataEnergy: data.overview.lastDayData.energy,
    currentPower: data.overview.currentPower.power,
  };
}