import type {StationDto, Station, CommandNumberDto, CommandNumber, WeatherData} from './weatherReport';
import Papa from 'papaparse';

export function parseStation(stationDto: StationDto): Station {
  return {
    id: stationDto.id,
    name: stationDto.nom,
    isOpen: stationDto.posteOuvert,
    type: stationDto.typePoste,
    lon: stationDto.lon,
    lat: stationDto.lat,
    alt: stationDto.alt,
    isPublic: stationDto.postePublic,
  };
}

export function parseCommandNumber(commandNumberDto: CommandNumberDto): CommandNumber {
  return {
    value: commandNumberDto.elaboreProduitAvecDemandeResponse.return,
  };
}

export function parseWeatherData(weatherData: string): WeatherData[] {
  const weatherDataParsed = Papa.parse(weatherData, {delimiter: ';'});
  let weatherDataArray = [];
  for (let i = 1; i < weatherDataParsed.data.length-1; i++) {
    let averageTemp = "";
    let averageTemp10cm = "";
    let averageTemp50cm= "";
    let date = "";
    for (let y = 0; y < weatherDataParsed.data[0].length; y++) {
      switch (weatherDataParsed.data[0][y]) {
        case 'DATE':
          date = weatherDataParsed.data[i][y];
          break;
        case 'TM':
          averageTemp = weatherDataParsed.data[i][y];
          break;
        case 'TNSOL':
          averageTemp10cm = weatherDataParsed.data[i][y];
          break;
        case 'TN50':
          averageTemp50cm = weatherDataParsed.data[i][y];
          break;
      }
    }
    weatherDataArray.push({
      date: date,
      averageTemp: averageTemp,
      averageTemp10cm: averageTemp10cm,
      averageTemp50cm: averageTemp50cm,
    });
  }
  return weatherDataArray;
}