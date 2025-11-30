export default defineNuxtRouteMiddleware((to) => {
  try {
    const api_store = useApiStore();
    const session = api_store.session;

    if (session) {
      console.log("SESSION LOG MIDDLEWARE: ", api_store.session);
    } else {
      console.log("SESSION LOG MIDDLEWARE: No Session Found");
    }
  } catch (error) {
    console.error("Error in SESSION LOG MIDDLEWARE: ", error);
  }
});
