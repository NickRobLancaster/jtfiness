// server/api/organizations.js

import Organization from "../../models/organizations";

export default defineEventHandler(async (event) => {
  try {
    // awaitConnectToDatabase();

    console.log("USERS REQUEST: ", event.node.req.method);
    const { id } = event.context.params;

    if (!id) {
      return { error: "Please provide an ID" };
    }

    console.log("ID PARAM: ", id);

    // Fetch data using the Mongoose model
    const deleted_organizations = await Organization.deleteOne({
      _id: id,
    });

    console.log("Organization Deleted: ", deleted_organizations);

    return { deleted_organizations };
  } catch (error) {
    console.error("Error deleting organization: ", error);
    return { status: "error", message: `Failed to delete organization: ${error}` };
  }
});
