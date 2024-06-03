import { createError, eventHandler, readBody } from 'h3'
import { sign, verify } from 'jsonwebtoken'

const config = useRuntimeConfig();

interface UserJwt {
  username: string,
  role: string,
}

interface JwtPayload extends UserJwt {
  exp: number;
}

export default eventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event)

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, no refreshToken in payload'
    })
  }

  const decoded = verify(body.refreshToken, config.jwtSecret) as JwtPayload | undefined

  if (!decoded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, refreshToken can`t be verified'
    })
  }

  const expiresIn = 60 * 5 // 5 minutes

  const userJwt: UserJwt = {
    username: decoded.username,
    role: decoded.role,
  }

  const accessToken = sign({ ...userJwt }, config.jwtSecret, {
    expiresIn
  })
  const refreshToken = sign({ ...userJwt }, config.jwtSecret, {
    expiresIn: 60 * 60 * 24
  })

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})