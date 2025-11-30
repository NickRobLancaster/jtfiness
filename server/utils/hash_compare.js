import bcrypt from "bcrypt";

/**
 * Verifies whether a plain-text password matches a previously hashed password.
 *
 * @param {string} plainTextPassword - The password entered by the user during login.
 * @param {string} hashedPassword - The stored hashed password in the database.
 * @returns {boolean} - Returns true if the passwords match, otherwise false.
 */
export async function hash_compare(plainTextPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error verifying password:", err);
    // You might want to handle or rethrow this error in a real-world scenario
    return false;
  }
}

/*
Usage Example:

import { verifyPassword } from './authUtils.js';

// Suppose you fetched the user's record based on their username or email.
const userRecord = {
  username: "jdoe",
  hashedPassword: "$2b$10$g7iD8Bw9d2kKnRe9EaVXHeQiYRcjKIDBCpLFMa44HD6HekPOrcj7S" // For example
};

async function handleLoginAttempt(enteredPassword) {
  const isValid = await verifyPassword(enteredPassword, userRecord.hashedPassword);
  
  if (isValid) {
    console.log("Password is correct. Proceed with login success flow.");
    // Set user session / token, etc.
  } else {
    console.log("Password is incorrect. Return an error or prompt for re-entry.");
  }
}
*/
