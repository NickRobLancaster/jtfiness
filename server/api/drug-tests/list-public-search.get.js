// server/api/drug-tests/search-string.get.js

import DrugTests from "../../models/drug-tests.js";
import Drugs from "../../models/drugs.js";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event);

    // Pagination controls
    const page = parseInt(query.page || "1", 10);
    const limit = 9;
    const skip = (page - 1) * limit;

    // Normalize the search string
    const raw_search = query.search_string || "";
    const search_string = raw_search.trim();

    // Base filter for all queries
    const base_query = {
      status: "Complete",
    };

    // Add search string logic across zip_code and city
    if (search_string.length > 0) {
      const regex = new RegExp(search_string, "i");

      base_query.$or = [
        { zip_code: { $regex: regex } },
        { city: { $regex: regex, $ne: null } },
      ];
    }

    // Custom replacer to handle RegExp objects in JSON.stringify
    function replacer(key, value) {
      if (value instanceof RegExp) {
        return value.toString();
      }
      return value;
    }

    console.log(
      "🔍 Final search query:",
      JSON.stringify(base_query, replacer, 2)
    );

    // Fetch results and total count in parallel
    const [records, total] = await Promise.all([
      DrugTests.find(base_query)
        .populate({
          path: "results_data.major_identified_substances",
          populate: {
            path: "major_drug",
            model: Drugs,
            select: "drug categories_of_drug drug_information",
          },
        })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DrugTests.countDocuments(base_query),
    ]);

    return {
      records,
      total,
      page,
    };
  },
  {
    maxAge: 60 * 30, // Cache for 30 minutes
    swr: true, // Enable Stale-While-Revalidate
  }
);
