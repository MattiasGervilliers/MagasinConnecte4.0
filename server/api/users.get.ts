import { User } from "~/models/user";
import { UserRepository } from "~/server/repository/UserRepository";

type Query = {
  email: string;
};

export default defineEventHandler(async (event): Promise<User[]> => {
  const { email } = getQuery<Query>(event);

  if (email) {
    const user = await UserRepository.getUserByEmail(email);
    return user ? [user] : [];
  }

  return await UserRepository.getUsers();
});
