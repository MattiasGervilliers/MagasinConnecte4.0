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

  public static async saveUserByEmail(
    email: string,
    user: User,
  ): Promise<User> {
    try {
      const users = await this.getUsers();
      const index = users.findIndex((user: User) => user.email === email);
      users[index] = user;

      return (await this.saveUsers(users)).find(
        (user: User) => user.email === email,
      ) as User;
    } catch (error) {
      throw new Error("Error saving user by email");
    }
  }

  public static async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      return (await this.getUsers()).find((user: User) => user.email === email);
    } catch (error) {
      throw new Error("Error getting user by email");
    }
  }
}
