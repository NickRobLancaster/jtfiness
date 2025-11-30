import Drugs from "../../models/drugs";

export default defineEventHandler(async (event) => {
  try {
    const { query: raw_query, page, limit } = getQuery(event);

    const parsed_page = parseInt(page);
    const parsed_limit = parseInt(limit);

    const query_object =
      typeof raw_query === "string" ? JSON.parse(raw_query) : raw_query || {};
    const use_query = query_object && Object.keys(query_object).length > 0;
    const use_pagination = !isNaN(parsed_page) && !isNaN(parsed_limit);

    const total_count = await Drugs.countDocuments(
      use_query ? query_object : {}
    );

    const mongoose_query = Drugs.find(use_query ? query_object : {}).select(
      "drug categories_of_drug drug_information alternative_names"
    );

    if (use_pagination) {
      mongoose_query.skip((parsed_page - 1) * parsed_limit).limit(parsed_limit);
    }

    const drugs_list = await mongoose_query.lean();

    console.log("DRUGS FOUND AT API: ", drugs_list);

    return {
      status: "success",
      message: "Drugs list retrieved successfully",
      drugs_list,
      picklist: drugs_list,
      total_count,
    };
  } catch (error) {
    console.error("Error retrieving Drugs list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve Drugs list: ${error}`,
    };
  }
});
