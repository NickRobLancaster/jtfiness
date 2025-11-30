import jwt from "jsonwebtoken";

export function verify_jwt_token(token, secret = process.env.NUXT_JWT_SECRET) {
  try {
    const decoded = jwt.verify(token, secret); // Returns decoded payload if valid
    // console.log("TOKEN VERIFICATION GRANTED");
    return decoded;
  } catch (error) {
    // console.log("TOKEN VERIFICATION DENIED - FROM verify_jwt.js");
    return false; // Invalid token
  }
}
