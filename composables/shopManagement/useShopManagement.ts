import moment from "moment";
import { DEFAULT_DAYS } from "~/constants/defaultValues";
import type { Day, Shop } from "~/models/shop";

type UseShopManagementReturn = {
  loadState: (shops: Shop[]) => Shop[];
};

export const useShopManagement = (): UseShopManagementReturn => {
  const { currentWeekNumber } = useWeek();

  const loadDefaultDays = (): Day[] => {
    return Array.from(
      { length: 7 },
      (_, index): Day => ({
        day: moment()
          .isoWeekday(index + 1)
          .format("dddd"),
        ...DEFAULT_DAYS,
      }),
    );
  };

  const loadDays = (shop: Shop, currentWeek: number): Day[] => {
    if (shop.currentWeek.number === currentWeek) {
      return shop.currentWeek.days;
    } else if (shop.nextWeek.number === currentWeek) {
      return shop.nextWeek.days;
    } else {
      return loadDefaultDays();
    }
  };

  const loadState = (shops: Shop[]): Shop[] => {
    return shops.map((shop: Shop) => ({
      ...shop,
      currentWeek: {
        number: currentWeekNumber,
        days: loadDays(shop, currentWeekNumber),
      },
      nextWeek: {
        number: currentWeekNumber + 1,
        days: loadDays(shop, currentWeekNumber + 1),
      },
    }));
  };

  return {
    loadState,
  };
};
