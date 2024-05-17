import {type CommandNumber, type Station, type StationDto} from '~/models/weatherReport';
import {parseCommandNumber, parseStation} from '~/models/parser';

const apiKey = "REDACTED"
const headers = {
    'accept': '*/*',
    'apikey': apiKey
}
export async function fetchStationList(idDepartment: number): Promise<Station[]> {
    const response = await fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=${idDepartment}`, {
        headers: headers
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const result: StationDto[] = await response.json()
    return result.map(parseStation)
}

export async function fetchCommandNumber(idStation: string, beginningDate: string, endDate: string): Promise<CommandNumber> {
    const response = await fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${idStation}&date-deb-periode=${beginningDate}&date-fin-periode=${endDate}`, {
        headers: headers
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return parseCommandNumber(await response.json())
}

export async function fetchWeatherData(idCommand: string) {
    const response = await fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${idCommand}`, {
        headers: headers
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}