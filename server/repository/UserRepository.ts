import { User } from "~/models/user";
import { JsonConnector } from "../connector/JsonConnector";

// Be careful with the path, if the file is not found, it will throw an error
export class UserRepository {
  static filePath: string = process.cwd() + "/data/user.json";

  public static async saveUsers(users: User[]): Promise<User[]> {
    try {
      await JsonConnector.saveData(users, this.filePath);
      return (await JsonConnector.getData(this.filePath)) as User[];
    } catch (error) {
      throw new Error("Error saving users");
    }
  }

  public static async getUsers(): Promise<User[]> {
    try {
      return (await JsonConnector.getData(this.filePath)) as User[];
    } catch (error) {
      throw new Error("Error getting users");
    }
  }

  public static async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const users = await this.getUsers();
      return users.find((user) => user.email === email);
    } catch (error) {
      throw new Error("Error getting user by email");
    }
  }
}
