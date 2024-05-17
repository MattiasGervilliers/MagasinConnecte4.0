import {fetchCommandNumber, fetchStationList, fetchWeatherData} from './queries.js';

async function getClosestStation(departmentId: number): Promise<string> {
    try {
        const station = await fetchStationList(departmentId);
        return station[6].id;
    } catch (error) {
        console.error('Failed to fetch stations:', error);
        return '';
    }
}

async function getCommandNumber(stationId: string, beginningDate: string, endDate: string): Promise<string> {
    try {
        const commandNumber = await fetchCommandNumber(stationId, beginningDate, endDate);
        return commandNumber.value;
    } catch (error) {
        console.error('Failed to fetch command number:', error);
        return '';
    }
}

async function getWeatherData(commandId: string) {
    try {
        return await fetchWeatherData(commandId);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

export async function getWeatherReportData(departmentId: number, beginningDate: string, endDate: string) {
    const stationId = await getClosestStation(departmentId);
    console.log("stationId: ", stationId);
    const commandNumber= await getCommandNumber(stationId, beginningDate, endDate);
    console.log("commandNumber: ", commandNumber);
    const weatherData = await getWeatherData(commandNumber);
    console.log("data: ", weatherData);
}