import { defineTool } from "@lovable.dev/mcp-js";
import { destinations, mockTrips } from "@/data/mockTrips";

export default defineTool({
  name: "list_destinations",
  title: "List destinations",
  description:
    "List all destinations Trippinity covers, with the number of trips available in each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const results = destinations.map((d) => ({
      name: d.name,
      emoji: d.emoji,
      tripCount: mockTrips.filter((t) => t.destination === d.name).length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, destinations: results },
    };
  },
});
