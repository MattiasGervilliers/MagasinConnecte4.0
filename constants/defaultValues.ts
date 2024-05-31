import type { Shop } from "~/models/shop";

export const SHOP_1: Shop = {
  name: "Shop 1",
  description: "This is a shop",
  address: "123 Fake St",
  image: "https://via.placeholder.com/150",
  currentWeekNumber: 0,
  nextWeekNumber: 0,
  lat: 51.5074,
  lng: 0.1278,
  currentWeek: [],
  nextWeek: [],
};

export const SHOP_2: Shop = {
  name: "Shop 2",
  description: "This is another shop",
  address: "456 Fake St",
  image: "https://via.placeholder.com/150",
  currentWeekNumber: 0,
  nextWeekNumber: 0,
  lat: 78.5074,
  lng: 0.1278,
  currentWeek: [],
  nextWeek: [],
};

export const SHOPS: Shop[] = [SHOP_1, SHOP_2];
