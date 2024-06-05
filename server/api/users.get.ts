import { User } from "~/models/user";
import { UserRepository } from "~/server/repository/UserRepository";

type Query = {
  email: string;
  safe: boolean;
};

export default defineEventHandler(async (event): Promise<User[]> => {
  const { email, safe } = getQuery<Query>(event);

  let users: User[];

  if (email) {
    const user = await UserRepository.getUserByEmail(email);
    users = user ? [user] : [];
  } else {
    users = await UserRepository.getUsers();
  }

  if (safe) {
    users.forEach((user) => {
      user.password = '';
    })
  }

  return users;
});
