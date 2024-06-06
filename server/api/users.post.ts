import { User } from "~/models/user";
import { UserRepository } from "~/server/repository/UserRepository";

export default defineEventHandler(async (event): Promise<Error | User | undefined> => {
  const body: User = await readBody(event);

  try {
    return await UserRepository.createUser(body);
  } catch (error) {
    console.error(error);
    throw new Error("Error writing to file");
  }
});