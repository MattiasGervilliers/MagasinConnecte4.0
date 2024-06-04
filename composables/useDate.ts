import moment from "moment";

type UseDateReturn = {
  currentDay: number;
  currentWeek: number;
  currentHour: string;
  currentDayIndex: number;
};

export const useDate = (): UseDateReturn => {
  const currentDay: number = moment(new Date()).day();
  const currentWeek: number = moment(new Date()).week();
  const currentHour: string = moment(new Date()).format("HH:mm");
  const currentDayIndex = moment(new Date()).day() - 1;

  return { currentDay, currentWeek, currentHour, currentDayIndex };
};
