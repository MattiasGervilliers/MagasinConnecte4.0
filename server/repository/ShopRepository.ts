import { Shop } from "~/models/shop";
import { JsonConnector } from "../connector/JsonConnector";

// Be careful with the path, if the file is not found, it will throw an error
export class ShopRepository {
  static filePath: string = process.cwd() + "/data/shop.json";

  public static async saveShops(shops: Shop[]): Promise<Shop[]> {
    try {
      await JsonConnector.saveData(shops, this.filePath);
      return (await JsonConnector.getData(this.filePath)) as Shop[];
    } catch (error) {
      throw new Error("Error saving shops");
    }
  }

  public static async getShops(): Promise<Shop[]> {
    try {
      return (await JsonConnector.getData(this.filePath)) as Shop[];
    } catch (error) {
      throw new Error("Error getting shops");
    }
  }
}
