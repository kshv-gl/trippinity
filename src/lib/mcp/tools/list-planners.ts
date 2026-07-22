import { defineTool } from "@lovable.dev/mcp-js";
import { companies, mockTrips } from "../../../data/mockTrips";

export default defineTool({
  name: "list_planners",
  title: "List verified planners",
  description:
    "List all verified Trippinity travel planners (companies) with their ratings and trip counts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const results = Object.values(companies).map((c) => ({
      id: c.id,
      name: c.name,
      verified: c.verified,
      rating: c.rating,
      trips: c.trips,
      about: c.about,
      liveTripCount: mockTrips.filter((t) => t.companyId === c.id).length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, planners: results },
    };
  },
});
