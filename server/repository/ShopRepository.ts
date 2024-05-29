import { Shop } from "~/models/shop";
import { JsonConnector } from "../connector/JsonConnector";

// Be careful with the path, if the file is not found, it will throw an error
export class ShopRepository {
  public static async saveShops(shops: Shop[]): Promise<Shop[]> {
    await JsonConnector.saveData(shops);

    return (await JsonConnector.getData()) as Shop[];
  }

  public static async getShops(): Promise<Shop[]> {
    return (await JsonConnector.getData()) as Shop[];
  }
}
