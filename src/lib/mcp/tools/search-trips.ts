import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mockTrips } from "@/data/mockTrips";

export default defineTool({
  name: "search_trips",
  title: "Search trips",
  description:
    "Search the Trippinity trip catalog by destination, budget, duration and rating. Returns matching trips with id, title, price, duration, destination, rating and planner.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Free-text query matched against trip title and location."),
    destination: z
      .string()
      .optional()
      .describe("Destination name filter, e.g. 'Goa', 'Kerala', 'Ladakh'."),
    maxPrice: z.number().int().positive().optional().describe("Max price in INR."),
    minPrice: z.number().int().positive().optional().describe("Min price in INR."),
    minRating: z.number().min(0).max(5).optional().describe("Minimum trip rating."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, destination, maxPrice, minPrice, minRating, limit }) => {
    const q = query?.trim().toLowerCase();
    const dest = destination?.trim().toLowerCase();
    const results = mockTrips
      .filter((t) => (dest ? t.destination.toLowerCase().includes(dest) : true))
      .filter((t) => (maxPrice ? t.price <= maxPrice : true))
      .filter((t) => (minPrice ? t.price >= minPrice : true))
      .filter((t) => (minRating ? t.rating >= minRating : true))
      .filter((t) =>
        q
          ? t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
          : true,
      )
      .slice(0, limit ?? 10)
      .map((t) => ({
        id: t.id,
        title: t.title,
        price: t.price,
        duration: t.duration,
        destination: t.destination,
        location: t.location,
        rating: t.rating,
        booked: t.booked,
        planner: t.plannerName,
        companyId: t.companyId,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
