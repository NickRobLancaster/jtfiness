import DrugTests from "../../models/drug-tests.js";
import Drugs from "../../models/drugs.js";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const page = parseInt(String(query.page), 10) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    let additionalFilter = {};

    if (query.query) {
      try {
        const decoded = decodeURIComponent(query.query);
        additionalFilter = JSON.parse(decoded);
      } catch (err) {
        console.warn("❌ Failed to parse query param:", err);
      }
    }

    const baseQuery = {
      status: "Complete",
    };

    // ✅ If category filter exists, use it to find matching Drugs and build $elemMatch query
    if (additionalFilter?.categories_of_drug?.$in?.length) {
      const matchingDrugs = await Drugs.find({
        categories_of_drug: { $in: additionalFilter.categories_of_drug.$in },
      }).select("_id");

      const matchingDrugIds = matchingDrugs.map((d) => d._id);

      baseQuery["results_data.major_identified_substances"] = {
        $elemMatch: {
          major_drug: { $in: matchingDrugIds },
        },
      };

      delete additionalFilter.categories_of_drug;
    }

    // If major_drugs_only filter exists
    if (additionalFilter?.major_drugs_only?.$in?.length) {
      const foundDrugs = await Drugs.find({
        _id: { $in: additionalFilter.major_drugs_only.$in },
      }).select("_id");

      const drugIds = foundDrugs.map((d) => d._id);

      if (drugIds.length > 0) {
        baseQuery["results_data.major_identified_substances.major_drug"] = {
          $in: drugIds,
        };
      }

      delete additionalFilter.major_drugs_only;
    }

    // Add anything else leftover in additionalFilter
    Object.assign(baseQuery, additionalFilter);

    console.log("BASE QUERY: ", JSON.stringify(baseQuery, null, 2));

    const [records, total] = await Promise.all([
      DrugTests.find(baseQuery)
        .populate({
          path: "results_data.major_identified_substances",
          populate: {
            path: "major_drug",
            model: Drugs,
            select: "drug categories_of_drug",
          },
        })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DrugTests.countDocuments(baseQuery),
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
