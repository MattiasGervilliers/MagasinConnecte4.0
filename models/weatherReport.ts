export type StationDto = {
  id: string;
  nom: string;
  posteOuvert: boolean;
  typePoste: number;
  lon: number;
  lat: number;
  alt: number;
  postePublic: boolean;
};

export type Station = {
  id: string;
  name: string;
  isOpen: boolean;
  type: number;
  lon: number;
  lat: number;
  alt: number;
  isPublic: boolean;
};

export type CommandNumberDto = {
  elaboreProduitAvecDemandeResponse: {
    return: string;
  };
};

export type CommandNumber = {
  value: string;
};

export type WeatherData = {
  date: string,
  averageTemp: string,
  averageTemp10cm: string,
  averageTemp50cm: string;
};
