// server/api/users.js
import User from "../../models/users";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if (!id) {
      return { error: "Please provide an ID" };
    }

    console.log("DELETE USER REQUEST:", id);

    // Find the user to be deleted
    const user_to_delete = await User.findById(id).lean();
    if (!user_to_delete) {
      return { error: "User not found" };
    }

    // If the user is a super, make sure they're not the last one
    if (user_to_delete.role === "super") {
      const super_count = await User.countDocuments({ role: "super" });

      if (super_count <= 1) {
        console.warn("Deletion blocked: would remove last super user");
        return {
          status: "error",
          message: "Cannot delete the last super user in the system.",
        };
      }
    }

    // Proceed with deletion
    const deleted_users = await User.deleteOne({ _id: id });
    console.log("User deleted:", deleted_users);

    return { deleted_users };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { status: "error", message: `Failed to delete user: ${error}` };
  }
});
