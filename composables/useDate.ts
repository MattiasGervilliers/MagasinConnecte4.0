import moment from "moment";

type UseDateReturn = {
  currentDay: number;
  currentWeek: number;
  currentHour: string;
};

export const useDate = (): UseDateReturn => {
  const currentDay: number = moment(new Date()).day();
  const currentWeek: number = moment(new Date()).week();
  const currentHour: string = moment(new Date()).format("HH:mm");

  return { currentDay, currentWeek, currentHour };
};
