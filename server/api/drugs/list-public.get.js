import Drugs from "../../models/drugs";

export default cachedEventHandler(
  async (event) => {
    try {
      const query = getQuery(event);
      const page = parseInt(String(query.page), 10) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      // Fetch data with pagination
      const [records, total] = await Promise.all([
        Drugs.find()
          .select(
            "drug categories_of_drug drug_information alternative_names created_at"
          )
          .skip(skip)
          .limit(limit)
          .lean(),
        Drugs.countDocuments(),
      ]);

      console.log("DRUGS FOUND AT API: ", records);

      return {
        status: "success",
        message: "Drugs list retrieved successfully",
        records,
        total,
        page,
      };
    } catch (error) {
      console.error("Error retrieving Drugs list: ", error);
      return {
        status: "error",
        message: `Failed to retrieve Drugs list: ${error}`,
      };
    }
  },
  {
    maxAge: 60 * 30, // Cache for 30 minutes
    swr: true, // Enable Stale-While-Revalidate
  }
);
