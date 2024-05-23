import {
  type StationDto,
  type Station,
  type CommandNumberDto,
  type CommandNumber,
} from "./weatherReport";

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

export function parseCommandNumber(
  commandNumberDto: CommandNumberDto | null,
): CommandNumber {
  if (commandNumberDto === null) {
    return {
      value: "",
    };
  }
  return {
    value: commandNumberDto.elaboreProduitAvecDemandeResponse.return,
  };
}
