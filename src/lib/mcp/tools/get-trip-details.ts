import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mockTrips, companies } from "@/data/mockTrips";

export default defineTool({
  name: "get_trip_details",
  title: "Get trip details",
  description:
    "Fetch the full details of a Trippinity trip by id: itinerary, dates, gallery, planner and company info.",
  inputSchema: {
    id: z.string().min(1).describe("The trip id, e.g. '1'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const trip = mockTrips.find((t) => t.id === id);
    if (!trip) {
      return {
        content: [{ type: "text", text: `No trip found with id "${id}".` }],
        isError: true,
      };
    }
    const company = companies[trip.companyId] ?? null;
    const detail = { ...trip, company };
    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: detail,
    };
  },
});
