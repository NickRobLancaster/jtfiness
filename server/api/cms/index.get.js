// server/api/content.get.js
import Content from "../../models/cms";

export default defineCachedEventHandler(
  async (event) => {
    const { page: page } = getQuery(event) || {};

    if (!page || typeof page !== "string") {
      setResponseStatus(event, 400);
      return { error: "missing_or_invalid_page" };
    }

    // Query Mongo for the public page. Use lean() for faster reads.
    const content_doc = await Content.findOne({ page: page }).lean().exec();

    if (!content_doc) {
      setResponseStatus(event, 404);
      return { error: "page_not_found" };
    }

    // Return the full document as-is
    return { content: content_doc };
  },
  {
    // 30 minutes cache TTL
    maxAge: 60 * 30,

    // Serve cached immediately and refresh in background
    swr: true,
  }
);
