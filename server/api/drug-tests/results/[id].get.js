// server/api/users.js
import DrugTests from "../../../models/drug-tests";
import Drugs from "../../../models/drugs";

export default cachedEventHandler(
  async (event) => {
    console.log("DRUG TESTS SAMPLE RESULTS REQUEST: ", event.node.req.method);

    const { id } = event.context.params;

    if (!id) {
      return {
        error:
          "Please provide an ID to GET the specific Drug Test you're looking for",
      };
    }

    // Optionally add hyphens if your IDs follow the xxx-xxx-xxx format
    const added_hyphens = id.replace(
      /([A-Za-z0-9]{3})([A-Za-z0-9]{3})([A-Za-z0-9]{3})/,
      "$1-$2-$3"
    );

    const sample_id = added_hyphens.toUpperCase();

    // console.log("ID PARAM: ", sample_id);

    try {
      // Use Mongoose populate to replace object IDs in list_of_identified with
      // their corresponding 'name' field from the 'Drugs' collection.
      // "name -_id" selects only the name field and excludes _id from the returned sub-document.
      const one_drug_test = await DrugTests.findOne({ sample_id })
        .populate({
          path: "results_data.major_identified_substances.major_drug",
          model: Drugs, // or just "Drugs" if you used `mongoose.model('Drugs', ...)`
          select: "drug drug_information", // Choose the fields you want from the Drugs doc
        })
        // Populate the "trace_drug" field of each object in trace_identified_substances
        .populate({
          path: "results_data.trace_identified_substances.trace_drug",
          model: Drugs,
          select: "drug drug_information",
        })
        .lean();

      console.log(
        "Drug Test Found (Populated): ",
        JSON.stringify(one_drug_test, null, 2)
      );

      return { one_drug_test };
    } catch (error) {
      console.error("Error locating Drug Test: ", error);
      return {
        status: "error",
        message: `Failed to locate Drug Test: ${error}`,
      };
    }
  },
  {
    maxAge: 60 * 30, // Cache for 30 minutes
    swr: true, // Enable Stale-While-Revalidate
  }
);
