import { Shop } from "~/models/shop";
import fse from "fs-extra";

// Be careful with the path, if the file is not found, it will throw an error
export class ShopRepository {
  private static filePath = process.cwd() + "/data/shop.json";

  public static async saveShops(shops: Shop[]): Promise<Shop[]> {
    await fse
      .writeFile(this.filePath, JSON.stringify(shops, null, 2), "utf8")
      .catch((error) => {
        console.error(error);
        throw new Error("Error writing to file");
      });

    return this.getShops();
  }

  public static async getShops(): Promise<Shop[]> {
    return await fse
      .readFile(this.filePath, "utf-8")
      .then((data: string) => JSON.parse(data) as Shop[]);
  }
}
