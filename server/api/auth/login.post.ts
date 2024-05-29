import { createError, eventHandler, readBody } from 'h3'
import { z } from 'zod'
import { sign } from 'jsonwebtoken'

const config = useRuntimeConfig()

const SECRET = config.jwtSecret;

export default eventHandler(async (event) => {
  const result = z
    .object({ username: z.string().min(1), password: z.literal('hunter2') }) //TODO: Load real password and check it
    .safeParse(await readBody(event))
  if (!result.success) {
    throw createError({
      statusCode: 403,
    })
  }

  const expiresIn = 15

  const { username } = result.data

  const user = {
    username,
    picture: 'https://github.com/nuxt.png',
    name: 'User ' + username
  }

  const accessToken = sign({ ...user, scope: ['test', 'user'] }, SECRET, {
    expiresIn
  })
  const refreshToken = sign({ ...user, scope: ['test', 'user'] }, SECRET, {
    expiresIn: 60 * 60 * 24
  })

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})