export function set_session_cookie(event, token, options = {}) {
  const defaultOptions = {
    httpOnly: true, // Prevent JavaScript access to the cookie
    secure: process.env.NUXT_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    path: "/", // Make the cookie available for the entire app
    maxAge: Number(process.env.NUXT_JWT_EXPIRATION_TIME) * 1000,
    // maxAge: 60 * 1000, // 1 minute
  };

  // Merge default options with user-provided options
  const cookieOptions = { ...defaultOptions, ...options };

  // Set the "session" cookie
  setCookie(event, "session", token, cookieOptions);
}
