import { Shop } from "~/models/shop";
import { ShopRepository } from "../repository/ShopRepository";

export default defineEventHandler(async (event): Promise<Shop[]> => {
  const body: Shop[] = await readBody(event);

  try {
    return await ShopRepository.saveShops(body);
  } catch (error) {
    console.error(error);
    throw new Error("Error writing to file");
  }
});
