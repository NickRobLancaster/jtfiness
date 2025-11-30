//import bcrypt
import bcrypt from "bcrypt"; // or any hashing library you use

//utility that encrypts the api_username and api_key
export async function decrypt(api_username, api_key, encrypted_password) {
  console.log("UTILITY DECRYPT HIT");
  const secret = `${api_username}${api_key}`;

  const isValid = await bcrypt.compare(secret, encrypted_password);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  } else {
    console.log("User authenticated");
  }

  return isValid;
}

//usage
// await decrypt(api_username, api_key, user.encrypted_password);
