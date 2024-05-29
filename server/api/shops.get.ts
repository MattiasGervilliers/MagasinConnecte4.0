import { Shop } from "~/models/shop";
import { ShopRepository } from "../repository/ShopRepository";

export default defineEventHandler(async (event): Promise<Shop[]> => {
  return await ShopRepository.getShops();
});
