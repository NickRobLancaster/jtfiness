export function get_jwt_payload(event) {
  const session = getCookie(event, "session");
  // verify the JWT token
  const payload = verify_jwt_token(session);

  // log the payload
  console.log("SESSION PAYLOAD UTIL: ", payload);

  return payload;
}
