import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import sha256 from "crypto-js/sha256";
import { UserRepository } from "~/server/repository/UserRepository";

const config = useRuntimeConfig();

const SECRET = config.jwtSecret;

type LoginData = {
  username: string;
  password: string;
};

export default eventHandler(async (event) => {
  const loginData: LoginData = await readBody(event);
  const pwd: string =
    (await UserRepository.getUserByEmail(loginData.username))?.password || "";

  const result = z
    .object({ username: z.string().min(1), password: z.literal(pwd) })
    .safeParse(loginData);
  if (!result.success) {
    throw createError({
      statusCode: 403,
    });
  }

  const expiresIn = 15;

  const { username } = result.data;

  const user = {
    username,
    picture: "https://github.com/nuxt.png",
    name: "User " + username,
  };

  const accessToken = sign({ ...user, scope: ["test", "user"] }, SECRET, {
    expiresIn,
  });
  const refreshToken = sign({ ...user, scope: ["test", "user"] }, SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
