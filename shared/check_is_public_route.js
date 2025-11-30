export function is_public_route(path, publicRoutes = []) {
  // console.log("PUBLIC ROUTE FUNCTION: ", path);

  // Return true if there is an exact match
  // if (publicRoutes.includes(path)) {
  //   // console.log("EXACT ROUTE MATCH FOUND: ", path);
  //   return true;
  // }

  if (path === "/" || path === "/admin") {
    return true;
  }

  // Otherwise, allow anything that begins with one of the known routes + "/"
  // Example:
  //   If '/results' is in the array, then '/results/123' is allowed.
  //   If '/api/drug-tests/results' is in the array, then '/api/drug-tests/results/xyz' is allowed.
  return publicRoutes.some((route) => {
    // console.log("STARTS WITH ROUTE MATCH FOUND: ", route);
    const is_approved = path.startsWith(route);
    // console.log("PATH STARTS WITH APPROVED ROUTE: ", is_approved);
    return is_approved;
  });
}
