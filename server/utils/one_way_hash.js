// utils/hashPassword.js
import bcrypt from "bcrypt";

export async function one_way_hash(password) {
  const saltRounds = 10; // Adjust as needed for your security requirements
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
