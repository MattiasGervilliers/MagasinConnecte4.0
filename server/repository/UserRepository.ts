import { User } from "~/models/user";
import { JsonConnector } from "../connector/JsonConnector";

export class UserRepository {
  static filePath: string = process.cwd() + "/data/user.json";

  // TODO: Implement the method in front
  public static async saveUsers(users: User[]): Promise<User[]> {
    await JsonConnector.saveData(users, this.filePath);

    return (await JsonConnector.getData(this.filePath)) as User[];
  }

  public static async getUsers(): Promise<User[]> {
    return (await JsonConnector.getData(this.filePath)) as User[];
  }

  public static async saveUserByEmail(
    email: string,
    user: User,
  ): Promise<User> {
    const users = await this.getUsers();
    const index = users.findIndex((user: User) => user.email === email);
    users[index] = user;

    return (await this.saveUsers(users)).find(
      (user: User) => user.email === email,
    ) as User;
  }

  public static async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find((user: User) => user.email === email);
  }
}
