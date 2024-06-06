import moment from "moment";

type UseWeekReturn = {
  weeks: { name: string; value: number }[];
  currentWeekNumber: number;
};

/**
 *
 * @returns return current week and next week
 */
export const useWeek = (): UseWeekReturn => {
  const currentWeekNumber: number = moment(new Date()).isoWeek();
  const currentYear: number = moment(new Date()).year();

  const getStartAndEndOfWeek = (weekNumber: number, year: number) => {
    const startOfWeek = moment()
      .year(year)
      .week(weekNumber)
      .startOf("week")
      .add(1, "day");
    const endOfWeek = moment()
      .year(year)
      .week(weekNumber)
      .endOf("week")
      .add(1, "day");

    return {
      start: startOfWeek.format("DD/MM/YYYY"),
      end: endOfWeek.format("DD/MM/YYYY"),
    };
  };

  const weeks = [
    {
      name: `${getStartAndEndOfWeek(currentWeekNumber, currentYear).start} au ${getStartAndEndOfWeek(currentWeekNumber, currentYear).end}`,
      value: currentWeekNumber,
    },
    {
      name: `${getStartAndEndOfWeek(currentWeekNumber + 1, currentYear).start} au ${getStartAndEndOfWeek(currentWeekNumber + 1, currentYear).end}`,
      value: currentWeekNumber + 1,
    },
  ];

  return {
    weeks,
    currentWeekNumber,
  };
};
