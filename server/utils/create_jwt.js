import jwt from "jsonwebtoken";

export function create_jwt_token(
  payload, // will be user object that's currently being returned
  secret = process.env.NUXT_JWT_SECRET, // "secret" is the secret key used to sign the token
  expiresIn = Number(process.env.NUXT_JWT_EXPIRATION_TIME)
) {
  return jwt.sign(payload, secret, { expiresIn });
}
