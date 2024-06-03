import { User } from "~/models/user";
import { UserRepository } from "../repository/UserRepository";

export default defineEventHandler(async (event): Promise<User> => {
  const body: User = await readBody(event);

  try {
    return await UserRepository.saveUserByEmail(body.email, body);
  } catch (error) {
    console.error(error);
    throw new Error("Error writing to file");
  }
});
