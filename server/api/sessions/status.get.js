export default defineEventHandler((event) => {
  // Access the session object from the request
  const session = event.node.req.session;

  // Check if the session exists and if it contains any relevant user data
  if (session && session.user) {
    return {
      status: "active",
      message: "Session is active",
      session: session,
      user: session.user, // Return relevant session information if needed
    };
  } else {
    return {
      status: "inactive",
      message: "Session not found or has expired",
    };
  }
});
