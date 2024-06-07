import fse from "fs-extra";

export class JsonConnector {
  public static async saveData(data: any, filePath: string): Promise<void> {
    return await fse
      .writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
      .catch((error) => {
        console.error(error);
        throw new Error(`Error writing to file ${error}`);
      });
  }

  public static async appendData(data: any, filePath: string): Promise<void> {
    const allData = await this.getData(filePath);
    allData.push(data);
    return await this.saveData(allData, filePath);
  }

  public static async getData(filePath: string): Promise<any> {
    return await fse
      .readFile(filePath, "utf-8")
      .then((data: string) => JSON.parse(data));
  }
}
