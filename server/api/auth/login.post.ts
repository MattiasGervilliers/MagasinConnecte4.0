import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { UserRepository } from "~/server/repository/UserRepository";
import { User } from "~/models/user";

const config = useRuntimeConfig();

const SECRET = config.jwtSecret;

type LoginData = {
  username: string;
  password: string;
};

export default eventHandler(async (event) => {
  const loginData: LoginData = await readBody(event);
  const user: User | undefined = await UserRepository.getUserByEmail(loginData.username);

  const result = z
    .object({ username: z.string().min(1), password: z.literal(user?.password) })
    .safeParse(loginData);
  if (!result.success) {
    throw createError({
      statusCode: 403,
    });
  }

  const expiresIn = 15;

  const userToToken = {
    username: user?.email,
    role: user?.role,
  };

  const accessToken = sign({ ...userToToken }, SECRET, {
    expiresIn,
  });
  const refreshToken = sign({ ...userToToken }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
