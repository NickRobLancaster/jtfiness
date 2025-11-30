import { is_public_route } from "#shared/check_is_public_route";
import { api_public_routes, page_public_routes } from "#shared/routes_config";

export default defineEventHandler(async (event) => {
  //gets the current path requested
  const the_requested_route = event.node.req.url;

  // console.log("getRequestURL***: ", getRequestURL(event));

  const session = await get_jwt_payload(event);

  // console.log("FROM SERVER-SIDE GUARD | SESSION: ", session);

  console.log("SERVER-SIDE REQUESTED ROUTE:  ", the_requested_route);

  const is_api_route = the_requested_route.includes("/api");

  if (is_api_route) {
    console.log("FROM SERVER-SIDE GUARD | API Route");
    if (!is_public_route(the_requested_route, api_public_routes)) {
      console.log("FROM SERVER-SIDE GUARD | NOT A PUBLIC API ROUTE");

      try {
        await connectToDatabase();
      } catch (error) {
        console.log(
          "FROM SERVER-SIDE GUARD | Error Connecting to Database: ",
          error
        );
      }

      if (!session) {
        console.log("FROM SERVER-SIDE GUARD | REDIRECTING | No Session Exists");

        event.node.res.writeHead(302, { Location: "/admin" });
        event.node.res.end();
        return;

        // return await sendRedirect(event, "/admin", 302);
      }
    }
  } else {
    console.log("FROM SERVER-SIDE GUARD | PAGE Route");
    //navigate to the requested page as normal
    if (!is_public_route(the_requested_route, page_public_routes)) {
      console.log("FROM SERVER-SIDE GUARD | NOT A PUBLIC PAGE ROUTE");
      if (!session) {
        console.log(
          "FROM SERVER-SIDE GUARD | PAGE | Private Route | Redirecting - No Session Exists"
        );
        event.node.res.writeHead(302, { Location: "/admin" });
        event.node.res.end();
        return;

        // return await sendRedirect(event, "/admin", 302);
      }
    }
    console.log("SERVER GUARD END*******");
  }
});
