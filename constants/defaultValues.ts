import type { Day, Shop } from "~/models/shop";

export const SHOP_1: Shop = {
  name: "Shop 1",
  description: "This is a shop",
  address: "123 Fake St",
  image: "https://via.placeholder.com/150",
  lat: 51.5074,
  lng: 0.1278,
  currentWeek: {
    number: 1,
    days: [],
  },
  nextWeek: {
    number: 2,
    days: [],
  },
};

export const SHOP_2: Shop = {
  name: "Shop 2",
  description: "This is another shop",
  address: "456 Fake St",
  image: "https://via.placeholder.com/150",
  lat: 78.5074,
  lng: 0.1278,
  currentWeek: {
    number: 1,
    days: [],
  },
  nextWeek: {
    number: 2,
    days: [],
  },
};

export const DEFAULT_DAYS: Omit<Day, "day"> = {
  isOpen: false,
  withBreak: true,
  morningStart: "",
  morningEnd: "",
  afternoonStart: "",
  afternoonEnd: "",
};

export const SHOPS: Shop[] = [SHOP_1, SHOP_2];
