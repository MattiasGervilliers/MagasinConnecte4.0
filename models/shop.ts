export type Day = {
  day: string;
  morningStart?: string;
  morningEnd?: string;
  afternoonStart?: string;
  afternoonEnd?: string;
  isOpen: boolean;
};

export type Shop = {
  name: string;
  description: string;
  address: string;
  image: string;
  lng: number;
  lat: number;
  currentWeekNumber: number;
  nextWeekNumber: number;
  currentWeek: Day[];
  nextWeek: Day[];
};
