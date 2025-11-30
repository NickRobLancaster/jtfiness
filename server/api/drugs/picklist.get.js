import Drugs from "../../models/drugs";

export default cachedEventHandler(
  async (event) => {
    try {
      const records = await Drugs.find()
        .select(
          "drug categories_of_drug drug_information alternative_names created_at"
        )
        .lean();

      console.log("DRUGS FOUND AT API: ", records);

      return {
        status: "success",
        message: "All drugs retrieved successfully",
        records,
        total: records.length,
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
    maxAge: 60 * 30,
    swr: true,
  }
);
