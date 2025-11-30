import User from "../../models/users";

export default defineEventHandler(async (event) => {
  try {
    const { query: raw_query, page, limit } = getQuery(event);

    const parsed_page = parseInt(page);
    const parsed_limit = parseInt(limit);

    const query_object =
      typeof raw_query === "string" ? JSON.parse(raw_query) : raw_query || {};
    const use_query = query_object && Object.keys(query_object).length > 0;
    const use_pagination = !isNaN(parsed_page) && !isNaN(parsed_limit);

    const total_count = await User.countDocuments(
      use_query ? query_object : {}
    );

    const mongoose_query = User.find(use_query ? query_object : {}).select(
      "first_name last_name email role active"
    );

    if (use_pagination) {
      mongoose_query.skip((parsed_page - 1) * parsed_limit).limit(parsed_limit);
    }

    const users = await mongoose_query.lean();

    return {
      status: "success",
      message: "Users list retrieved successfully",
      users,
      total_count,
    };
  } catch (error) {
    console.error("Error retrieving users list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve users list: ${error}`,
    };
  }
});
