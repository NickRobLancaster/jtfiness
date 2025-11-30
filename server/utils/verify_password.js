// utils/verifyPassword.js
import bcrypt from "bcrypt";

export async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch; // Returns true if the password matches the hash
}
