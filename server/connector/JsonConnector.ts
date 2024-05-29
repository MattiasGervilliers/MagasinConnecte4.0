import fse from "fs-extra";

export class JsonConnector {
  private static filePath = process.cwd() + "/data/shop.json";

  public static async saveData(data: any): Promise<any> {
    await fse
      .writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8")
      .catch((error) => {
        console.error(error);
        throw new Error("Error writing to file");
      });

    return this.getData();
  }

  public static async getData(): Promise<any> {
    return await fse
      .readFile(this.filePath, "utf-8")
      .then((data: string) => JSON.parse(data));
  }
}
