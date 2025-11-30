import Organization from "../../models/organizations";

export default defineEventHandler(async (event) => {
  try {
    const { query: raw_query, page, limit } = getQuery(event);

    const parsed_page = parseInt(page);
    const parsed_limit = parseInt(limit);

    const query_object =
      typeof raw_query === "string" ? JSON.parse(raw_query) : raw_query || {};
    const use_query = query_object && Object.keys(query_object).length > 0;
    const use_pagination = !isNaN(parsed_page) && !isNaN(parsed_limit);

    // Count total matching documents
    const total_count = await Organization.countDocuments(
      use_query ? query_object : {}
    );

    const mongoose_query = Organization.find(
      use_query ? query_object : {}
    ).select("name location type populations_served");

    if (use_pagination) {
      mongoose_query.skip((parsed_page - 1) * parsed_limit).limit(parsed_limit);
    }

    const organizations = await mongoose_query.lean();

    return {
      status: "success",
      message: "Organizations list retrieved successfully",
      organizations,
      picklist: organizations,
      total_count,
    };
  } catch (error) {
    console.error("Error retrieving organizations list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve organizations list: ${error}`,
    };
  }
});
