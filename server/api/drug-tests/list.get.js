import DrugTests from "../../models/drug-tests";

export default defineEventHandler(async (event) => {
  console.log("DRUG TESTS LIST API CALLED");

  try {
    const { query: raw_query, page, limit } = getQuery(event);

    const parsed_page = parseInt(page);
    const parsed_limit = parseInt(limit);

    const query_object =
      typeof raw_query === "string" ? JSON.parse(raw_query) : raw_query || {};
    const use_query = query_object && Object.keys(query_object).length > 0;
    const use_pagination = !isNaN(parsed_page) && !isNaN(parsed_limit);

    console.log("Parsed query:");
    console.dir(query_object, { depth: null });

    const total_count = await DrugTests.countDocuments(
      use_query ? query_object : {}
    );

    const mongoose_query = DrugTests.find(use_query ? query_object : {}).select(
      "_id sample_id collection_date collecting_organization status street_name color sensations city zip_code neighborhood"
    );

    if (use_pagination) {
      mongoose_query.skip((parsed_page - 1) * parsed_limit).limit(parsed_limit);
    }

    const drug_tests = await mongoose_query.lean();

    return {
      status: "success",
      message: "Drug Tests list retrieved successfully",
      drug_tests,
      total_count,
    };
  } catch (error) {
    console.error("Error retrieving Drug Tests list: ", error);
    return {
      status: "error",
      message: `Failed to retrieve Drug Tests list: ${error}`,
    };
  }
});
