export default defineEventHandler(async (event) => {
  //get access to the route param
  const query = getQuery(event);

  const the_requested_route = query.route;

  const session = await get_jwt_payload(event);

  console.log("SESSION PAYLOAD: ", session);

  // if (session) {
  //   if (session.active !== "active") {
  //     //   setResponseStatus(event, 401);
  //     return {
  //       status: "error",
  //       message: "Session Check - Successful - Users's Status is Inactive",
  //     };
  //   }
  // }

  // if there is no session cookie, return a 401
  if (!session) {
    // setResponseStatus(event, 401);
    // Redirect to admin login

    //set the session cookie to a past date
    setCookie(event, "session", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // event.node.res.writeHead(302, { Location: "/admin" });
    // event.node.res.end();
    // return;
    // return {
    //   status: "error",
    //   message: "Session Check - Successful - No Session Exists",
    // };

    return sendRedirect(event, "/admin");
  }

  console.log("Session Check - Successful - Session Active");

  event.node.res.writeHead(302, { Location: the_requested_route });
  event.node.res.end();
  return;

  // return {
  //   status: "success",
  //   message: "Session is valid",
  // };
});
