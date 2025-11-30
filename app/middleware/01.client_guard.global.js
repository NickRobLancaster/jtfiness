import { is_public_route } from "#shared/check_is_public_route";
import { page_public_routes } from "#shared/routes_config";

export default defineNuxtRouteMiddleware((to) => {
  const api_store = useApiStore();

  const session = api_store.session;

  console.log("CLIENT SIDE GUARD SESSION***: ", session);

  //if session.expires_at is older than now, clear the session
  if (session) {
    const expires_at = new Date(session.expires_at);
    const now = new Date();

    if (expires_at < now) {
      console.log(
        "FROM CLIENT-SIDE GUARD | Session Expired | Clearing Session"
      );

      api_store.set_session(null);
    }
  }

  const the_requested_route = to.path;
  console.log(
    "FROM CLIENT-SIDE GUARD | REQUESTED URL | Client Requested: ",
    the_requested_route
  );

  console.log("FROM CLIENT-SIDE GUARD | Session Data: ", api_store.session);

  // Check if the route is public
  if (!is_public_route(the_requested_route, page_public_routes)) {
    if (!session || !session.api_username) {
      console.log(
        "FROM CLIENT-SIDE GUARD | Private Route | Redirecting - No Session Exists"
      );

      api_store.create_toast({
        title: "Session Expired",
        message: "Please log back in",
        color: "bg-orange-500",
      });

      return navigateTo("/admin");
    }

    if (session) {
      if (session.active === "suspended") {
        console.log(
          "FROM CLIENT-SIDE GUARD | Private Route | Redirecting - User is Suspended"
        );

        return navigateTo("/admin");
      }
    }
  }

  // else {
  //   if (session) {
  //     if (the_requested_route === "/admin") {
  //       console.log(
  //         "FROM CLIENT-SIDE GUARD | Private Route | CANT LOGIN AGAIN | Redirecting - Redirecting to /admin/dashboard"
  //       );

  //       return navigateTo("/admin/dashboard");
  //     }
  //   }

  //   //if passes session check and is a public route, continue
  //   console.log(
  //     "FROM CLIENT-SIDE GUARD | Public Route | Continuing - No Session Required"
  //   );
  // }
});
